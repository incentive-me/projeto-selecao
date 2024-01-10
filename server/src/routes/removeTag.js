import { PrismaClient } from "@prisma/client"

export async function RemoveTag(app) {
    const prisma = new PrismaClient()
    app.delete('/tag/:tagId/:reposId', async (request, reply) => {

        const {tagId, reposId} = request.params


        const remove = await prisma.tagsOnRepos.delete({
            where: { 
                reposId_tagId: {
                    tagId,
                    reposId
                }
            }
        })

        const tag = await prisma.reposStars.findUnique({
            where: { 
                id: reposId
            },
            select: {
               tags: {
                select: {
                    tag:{
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
               }
            }
        })

        console.log(tag)


        return tag

    })

}


