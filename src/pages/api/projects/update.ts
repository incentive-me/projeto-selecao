import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function update(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, labels } = req.body
  const { method } = req

  if (method !== 'PATCH') {
    return res.status(404).json(false)
  }
  const session = await getSession({ req })

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  })

  try {
    const result = await prisma.project.update({
      where: { id_userId: { userId: user.id, id: projectId } },
      data: {
        labels: labels
      },
    })
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.json(false)
  }
}