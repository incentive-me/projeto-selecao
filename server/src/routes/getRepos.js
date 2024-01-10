import { PrismaClient } from "@prisma/client"

export async function GetRepos(app) {
    const prisma = new PrismaClient()
    app.get('/:userId',async (request, reply) => {
        const userId = request.params.userId

        const repos = await prisma.reposStars.findMany({
            where: {
                repo_user_id: userId,
            },
            select: {
                author_url: true,
                count_stars: true,
                count_forks: true,
                description: true,
                full_name: true,
                id: true,
                linguage: true,
                updated_at: true,
                url: true,
                tags: {
                    select: {
                        tag: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })

        return repos
    })
}