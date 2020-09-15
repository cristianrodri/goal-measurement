const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const Jimp = require('jimp')
const User = require('../models/user.model')
const Token = require('../models/token.model')
const { transporter, mailOptions } = require('../email/confirmation')
const allowedUpdates = require('../helpers/allowedUpdates')

const userCtrl = {
  /**
   * @desc Create new user
   * @route /api/user/signup
   * @method POST
   * @access public
   */
  async createUser(req, res) {
    const user = new User(req.body)

    try {
      // Check if user upload avatar (req.file is provided by multer middleware)
      if (req.file) {
        const image = await Jimp.read(req.file.buffer)
        image.resize(250, Jimp.AUTO)
        image.quality(60)
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG)

        user.avatar = buffer
      }
      await user.save()

      // Generate token (only for confirmation purposes) and send an email confirmation
      const token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(20).toString('hex')
      })
      await token.save()

      // Use localhost in dev mode and domain url in prod mode
      const host =
        process.env.NODE_ENV !== 'production'
          ? 'localhost:3000'
          : req.headers.host

      transporter.sendMail(
        mailOptions(user, token, host, req.protocol),
        err => {
          if (err) return res.status(400).send(err)

          res.status(201).json({
            success: true,
            user,
            message: `A verification link was sent to ${user.email}`
          })
        }
      )
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          error: true,
          message: 'Email is already registered'
        })
      } else if (error.errors.password.path === 'password') {
        res.status(400).json({
          success: false,
          error: true,
          message: 'Your password must be higher than 7 characters'
        })
      } else {
        res.status(500).json({
          success: false,
          error: true,
          message: error.message
        })
      }
    }
  },

  /**
   * @desc Resend user confirmation link
   * @route /api/user/resend-link
   * @method POST
   * @access public
   */
  async resendLink(req, res) {
    const { email } = req.body

    try {
      // Search user by email
      const user = await User.findOne({ email })

      if (!user)
        return res
          .status(404)
          .send({ success: false, error: true, message: 'User is not found' })

      // Check if user has token confirmation and delete it
      await Token.findOneAndDelete({ _userId: user._id })

      // Generate token (only for confirmation purposes) and send email confirmation
      const token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(20).toString('hex')
      })
      await token.save()

      // Use localhost in dev mode and domain url in prod mode
      const host =
        process.env.NODE_ENV !== 'production'
          ? 'localhost:3000'
          : req.headers.host

      transporter.sendMail(
        mailOptions(user, token, host, req.protocol),
        err => {
          if (err)
            return res.status(400).json({
              success: false,
              error: true,
              message: err.message
            })

          res.status(201).json({
            success: true,
            message: `A verification link was sent to ${user.email}`,
            error: false
          })
        }
      )
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc User confirm the registration by clicking the link sent to email
   * @route /api/user/confirmation/:idUser/:idTokenUser
   * @method GET
   * @access public
   */
  async confirmation(req, res) {
    try {
      const token = await Token.findOne({ token: req.params.idTokenUser })

      if (!token) return res.json({ success: false })

      const user = await User.findById(token._userId)

      // user confirm token sent and his state is not verified
      if (user && !user.isVerified) {
        user.isVerified = true
        await user.save()
        await Token.findByIdAndDelete(token._id)
        return res.json({
          success: true,
          message: `Your account ${user.email} was confirmed successfully`
        })
      }

      res.json({ success: false })
    } catch (error) {
      res.status(400).json({
        success: false
      })
    }
  },

  /**
   * @desc User login
   * @route /api/user/login
   * @method POST
   * @access public
   */
  async loginUser(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      )

      if (!user.isVerified) {
        return res.status(401).json({
          success: false,
          isNotVerified: true,
          message:
            'Your account is not verified. Please verify the link sent to your email or resend the link'
        })
      }

      const token = user.generateAuthToken()

      // res.cookie('token', token, {
      //   expires: new Date(Date.now() + 6 * 3600000), // 6h
      // })

      res.json({
        success: true,
        isNotVerified: false,
        user,
        token,
        hasAvatar: !!user.avatar
      })
    } catch (error) {
      res.status(error.message.includes('User') ? 404 : 400).json({
        success: false,
        isNotVerified: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc User logout by cleaning cookie (NOT USED YET)
   * @route /api/user/logout
   * @method GET
   * @access private
   */
  async logout(req, res) {
    res.clearCookie('token')
    res.json({ message: 'Signout successfully' })
  },

  /**
   * @desc Get authenticated user details
   * @route /api/user/me
   * @method GET
   * @access private
   */
  async me(req, res) {
    try {
      const user = await User.findById(req.user._id)
      res.json({
        success: true,
        data: user,
        hasAvatar: !!user.avatar
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Update user properties
   * @route /api/user/me
   * @method PUT
   * @access private
   */
  async updateUser(req, res) {
    try {
      if (req.exceededFile) throw new Error('File exceeded 1MB')

      const updates = Object.keys(req.body)
      const isValidUpdate = allowedUpdates(
        ['username', 'email', 'avatar', 'deleteAvatar'],
        updates
      )

      if (!isValidUpdate)
        return res.status(400).json({
          success: false,
          error: true,
          message: 'Invalid updates'
        })

      const user = await User.findById(req.user._id)

      const oldAvatar = user.avatar

      // updates all changes (iterate over req.body object)
      updates.forEach(update => {
        if (update === '') return
        else user[update] = req.body[update]
      })

      // check if user change the avatar
      if (req.file) {
        const image = await Jimp.read(req.file.buffer)
        image.resize(250, Jimp.AUTO)
        image.quality(60)
        const buffer = await image.getBufferAsync(Jimp.MIME_PNG)

        user.avatar = buffer
      }

      // delete user avatar when no image is uploaded while current image is deleted
      if (JSON.parse(req.body['deleteAvatar'])) {
        user.avatar = undefined
      }

      await user.save()

      const newAvatar = user.avatar
      res.json({
        success: true,
        user,
        hasAvatar: newAvatar,
        hasChangedAvatar: oldAvatar !== newAvatar,
        message: 'Your profile was updated successfully'
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Delete user
   * @route /api/user/me
   * @method DELETE
   * @access private
   */
  async deleteUser(req, res) {
    const { password } = req.body

    try {
      const user = await User.findById(req.user._id)

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        throw new Error('Wrong password')
      }

      await user.remove()
      res.json({
        success: true,
        message: 'Your account was removed succesfully'
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Update user password
   * @route /api/user/update-password
   * @method PUT
   * @access private
   */
  async updatePassword(req, res) {
    const { password, newPassword } = req.body

    try {
      const user = await User.findById(req.user._id)
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) throw new Error('Your current password is wrong')

      user.password = newPassword

      await user.save()

      res.json({
        success: true,
        message: 'Your password was changed successfully'
      })
    } catch (error) {
      res.status(400).send({
        success: false,
        error: true,
        message: error.message
      })
    }
  },

  /**
   * @desc Get user avatar by id
   * @route /api/user/:id/avatar
   * @method GET
   * @access public
   */
  async userAvatar(req, res) {
    try {
      const user = await User.findById(req.params.id)

      if (!user.isVerified)
        return res.status(401).json({
          message: 'Please confirm verification email'
        })

      if (!user || !user.avatar) {
        throw new Error()
      }

      res.set('Content-Type', 'image/png')
      res.send(user.avatar)
    } catch (error) {
      res.status(404).send()
    }
  }
}

module.exports = userCtrl
