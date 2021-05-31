const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())





app.listen(3001, () => {
    console.log('Aplicação backend servindo a parta 3001')
})