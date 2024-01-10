import { PrismaClient } from "@prisma/client"

export async function CreateTag(app) {
    const prisma = new PrismaClient()
    app.post('/tag',async (request, reply) => {
        const { RepoId, name } = request.body

        let tag = await prisma.tag.findUnique({
            where: { 
                name
            }
        })
        
        if(!tag){
            tag = await prisma.tag.create({
                data: {
                    name,
                    tag_Repo :{
                        create: {
                            assignedBy: name,
                            repos: {
                                connect:{
                                    id: RepoId
                                }
                            }
                        }
                    }
                }
            })
        }else {
            tag = await prisma.tag.update({
                where: {
                    name
                },
                data: {
                    tag_Repo: {
                        create: {
                            assignedBy: name,
                            repos: {
                                connect: {
                                    id: RepoId
                                }
                            }
                        }
                    }
                }
            })
        }

        return tag
    })
}