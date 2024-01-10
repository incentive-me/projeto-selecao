import { PrismaClient } from "@prisma/client"

export async function CreateRepo(app) {
    const prisma = new PrismaClient()
    app.put('/register/repo/:userId', async (request, reply) => {
        try {
            const userId = request.params.userId
            const repo = request.body

            let data = await prisma.reposStars.findUnique({
                where: {
                    githubRepoId: repo.id
                }
            })

            if(!data){
                data = await prisma.reposStars.create({
                    data: {
                        githubRepoId: repo.id,
                        full_name: repo.full_name,
                        author_url: repo.owner.url,
                        description: repo.description ? repo.description : '' ,
                        linguage: repo.language ? repo.language : '',
                        count_stars: repo.stargazers_count,
                        count_forks: repo.forks_count,
                        updated_at: repo.updated_at,
                        url: repo.url ? repo.url : '',
                        repo_user: {
                            connect: {
                                id: userId
                            }
                        }
                    },
                })
            }

            console.log('success')
            return data
        } catch (error) {
            console.log(error)
        }
        
    })
}
