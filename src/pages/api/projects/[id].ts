import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

async function updateProject(id: number, userId: number, labels: string[]) {
    return await prisma.project.update({
        where: { id_userId: { id, userId } },
        data: {
            labels: labels
        },
    })
}

export default async function update(req: NextApiRequest, res: NextApiResponse) {
    const { labels } = req.body
    const { id } = req.query

    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json('Unauthorized')
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
    })

    switch (req.method) {
        case 'PATCH':
            try {
                const result = await updateProject(Number(id), user.id, labels)
                return res.json(result)
            } catch (error) {
                return res.status(500).json(error)
            }
        default:
            return res.status(404)
    }
}
