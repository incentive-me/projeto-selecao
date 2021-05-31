const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const port = 3001
app.use(cors())


app.get('/api', async (req,res)=>{
    const query = await req.query   
    const {clientId, clientSecret, code} = query 
    axios({
        method:'post',
        url:'https://github.com/login/oauth/access_token',
        params:{
            client_id:clientId,
            client_secret:clientSecret,
            code:code            
        },
        headers:{
            'Accept':'application/json'            
        }
    })
    .then(response =>         
        res.send(response.data)        
    )    
    .catch(err=>(res.send(err)))
}) 

app.listen(port, () => console.log(`Aplicação backend servindo a parta ${port}`))  