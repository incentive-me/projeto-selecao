import { PrismaClient } from "@prisma/client"
import axios from "axios"

export async function FilterRepoByTag(app) {
    const prisma = new PrismaClient()
    app.get('/filter/:id', async (request, reply) => {

        const tagId = request.params.id

        const relations = await prisma.tagsOnRepos.findMany({
            where: {
                tagId
            }
        })

        const reposIds = relations.map(relation => relation.reposId)
        let repos = []
        for (let i = 0; i < reposIds.length; i++) {
          const repo = await axios.get(`http://localhost:3000/repo/${reposIds[i]}`)
            repos.push(repo.data)
        }
        return repos

    })

}


