const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.autosender@gmail.com',
    pass: process.env.PASS
  }
})

async function sender(req, res) {
  const sender = `${req.body.name} <${req.body.email}>`
  const destiny = `${req.body.destiny}`
  const message = `${req.body.message}`

  if (message) {
    await transporter.sendMail({
      from: `${sender}`,
      text: `${message}`,
      subject: 'Formulário de contato',
      to: 'nathanssfirmo@gmail.com',
      replyTo: `${sender}`
    })
    console.log('Email sent')
  }
  res.redirect('https://projeto-selecao.vercel.app/tanks')
}

module.exports = sender