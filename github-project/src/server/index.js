const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())



app.listen(3000, () => {
    console.log('Aplicação backend servindo a parta 3000')
})