import { verify } from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '@/env';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IPayload {
  email: string;
}

export async function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return reply.status(401).send();
    }
    
    const [, token] = authToken.split(' ');

    const payload = verify(
      token,
      env.PRIVATE_KEY
    ) as IPayload;

    const user = await prisma.user.findFirst({
      where: {
        email: payload.email
      }
    });

    return request.user = user;
  } catch (err) {
    return reply.status(401).send();
  }
}