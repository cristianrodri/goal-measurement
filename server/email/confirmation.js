const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_user: process.env.USER,
      api_key: process.env.PASS
    }
  })
)

const mailOptions = (user, token, siteName) => ({
  from: 'carlo.interpab@gmail.com',
  to: user.email,
  subject: 'Confirmation email',
  text: `
    Confirm your account here
    ${siteName}/user/confirmation/${user._id}/${token.token}
  `
})

module.exports = { transporter, mailOptions }
