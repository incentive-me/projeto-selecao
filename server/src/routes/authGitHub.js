import 'dotenv/config'
import axios from "axios"
import { PrismaClient } from '@prisma/client'
// import { prisma } from '../lib/prisma'

export async function AuthGitHub(app) {
    const prisma = new PrismaClient()
    app.post('/register', async (request, reply) => {
        try {
            const { code }  = request.body

            const accessTokenResponse = await axios.post(
                'https://github.com/login/oauth/access_token',
                null,
                {
                    params: {
                        client_id: process.env.GITHUB_ID,
                        client_secret: process.env.GITHUB_SECRET,
                        code,
                    },
                    headers: {
                    Accept: 'application/json',
                    },
                },
            )

            const { access_token } = accessTokenResponse.data

            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            
            const userInfo = userResponse.data


            let user = await prisma.user.findUnique({
                where: {
                    gitgubId: userInfo.id,
                }
            })
            const urlReposStars = await axios.get(`${userInfo.url}/starred`)
            const reposStars = urlReposStars.data
    

            if(!user) {
                user = await prisma.user.create({
                    data: {
                        gitgubId: userInfo.id,
                        name: userInfo.name,
                        username: userInfo.login,      
                        email: userInfo.email,
                        avatar_url: userInfo.avatar_url,
                    }
                }) 
            }


            for(let i = 0; i < reposStars.length; i++){
                await axios.put(`http://localhost:3000/register/repo/${user.id}`, reposStars[i])
            }

            return {user}
            
        } catch (error) {
            app.log.error(error)
            reply.code(500).send("error server")
        }

    })
}