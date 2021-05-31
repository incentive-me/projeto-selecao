module.exports = async (req, res) => {
  const nodemailer = require('nodemailer')
  require('dotenv').config()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dev.autosender@gmail.com',
      pass: process.env.PASS
    }
  })

  const sender = `${req.body.name} <${req.body.email}>`
  const destiny = `${req.body.destiny}`
  const message = `${req.body.message}`

  if (message) {
    await transporter.sendMail({
      from: `${sender}`,
      text: `${message}`,
      subject: 'Formulário de contato',
      to: `${destiny}`,
      replyTo: `${sender}`
    })
    console.log('Email sent')
  }
    res.end(`    
    <script>
    window.location.href = "http://easyforms.vercel.app/tanks.html"
    </script>`)
}