import { PrismaClient } from "@prisma/client"

export async function GetRepo(app) {
    const prisma = new PrismaClient()
    app.get('/repo/:id',async (request, reply) => {
        const id = request.params.id

        const repo = await prisma.reposStars.findUnique({
            where: {
                id
            },
            select: {
                author_url: true,
                count_forks: true,
                count_stars: true,
                description: true,
                full_name: true,
                githubRepoId: true,
                id: true,
                linguage: true,
                repo_user_id: true,
                updated_at: true,
                url: true,
                tags: {
                    select: {
                        tag: true
                    }
                }
            }
        })

        console.log(repo)
        return repo
    })
}