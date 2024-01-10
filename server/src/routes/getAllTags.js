import { PrismaClient } from "@prisma/client"

export async function GetAllTags(app) {
    const prisma = new PrismaClient()
    app.get('/tags',async (request, reply) => {

        const tags = await prisma.tag.findMany()

        return tags
    })
}