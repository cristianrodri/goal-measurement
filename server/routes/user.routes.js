const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user.controller')
const auth = require('../middleware/auth')
const { upload } = require('../middleware/uploadImage')

router.post('/signup', upload.single('avatar'), userCtrl.createUser)
router.get('/confirmation/:idUser/:idTokenUser', userCtrl.confirmation)
router.post('/resend-link', userCtrl.resendLink)

router.post('/login', userCtrl.loginUser)
router.get('/logout', auth, userCtrl.logout)

// Get, update and delete user
router
  .route('/me')
  .get(auth, userCtrl.me)
  .put(
    auth,
    upload.single('avatar'),
    (err, req, res, next) => {
      err.code === 'LIMIT_FILE_SIZE'
        ? (req.exceededFile = true)
        : (req.exceededFile = false)

      next()
    },
    userCtrl.updateUser
  )
  .delete(auth, userCtrl.deleteUser)

router.put('/update-password', auth, userCtrl.updatePassword)

router.get('/token', userCtrl.getToken)

router.get('/logout', auth, userCtrl.logout)

module.exports = router
