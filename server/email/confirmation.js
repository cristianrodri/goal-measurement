const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com ',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

const mailOptions = (user, token, siteName) => ({
  from: process.env.USER,
  to: user.email,
  subject: 'Confirmation email',
  text: `
    Confirm your account here
    ${siteName}/user/confirmation/${user._id}/${token.token}
  `
})

module.exports = { transporter, mailOptions }
