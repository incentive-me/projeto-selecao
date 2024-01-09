import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', async (request) => {
    const createUserBody = z.object({
      name: z.string(),
      email:z.string(),
      password: z.string(),
    });

    const { name, email, password } = createUserBody.parse(request.body);

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    });
  });
}