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

const mailOptions = (user, token, host, protocol) => ({
  from: 'contacto.cristianrodriguez.com',
  to: user.email,
  subject: 'Confirmation email',
  text: `
    Confirm your account here
    ${protocol}://${host}/user/confirmation/${user._id}/${token.token}
  `
})

module.exports = { transporter, mailOptions }
