import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from './env';

const prisma = new PrismaClient();

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', async (request) => {
    const createUserBody = z.object({
      name: z.string(),
      email: z.string(),
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

  app.post('/login', async (request) => {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordHash = await compare(password, user.password);

    if (!passwordHash) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign(
      {
        email: user.email
      },
      env.PRIVATE_KEY,
      {
        expiresIn: '1m'
      }
    );

    return token;
  });
}