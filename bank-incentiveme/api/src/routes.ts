import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', async (request) => {
    const createUserBody = z.object({
      name: z.string(),
      email:z.string(),
      password: z.string(),
    });

    const { name, email, password } = createUserBody.parse(request.body);

    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
  });

}