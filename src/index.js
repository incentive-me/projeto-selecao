const express = require('express');
const app = express();
require('dotenv/config');

app.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
app.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: app,
    noCache: true
})

var access_token = "";

app.get("/", (req, res) => {
  return res.render("index.html")
})

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('Aplicativo rodando na porta ' + port));


const axios = require('axios')

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

app.get('/github/callback', (req, res) => {

  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', async function(req, res) {
  async function getRepositories() {
    const response = await axios.get(`https://api.github.com/user/starred`, {
      headers: {
        Authorization: 'token ' + access_token,
        accept: 'application/vnd.github.v3+json'
      }
    })
    const data = response.data.map(repository => (
        {
          id: repository.id, 
          name: repository.name, 
          description: repository.description, 
          url: repository.owner.html_url,
          avatar_url: repository.owner.avatar_url
        }
    ))
    return data
  }
 
  const response = await getRepositories()
  
  res.render('success.html',{ repositories: response });
});

