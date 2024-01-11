import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function transactionsRoute(app: FastifyInstance) {
  app.post(
    '/create', 
    {
      preHandler: [ensureAuthenticated]
    },
    async (request, reply) => {
      const { user } = request;

      const createTransactionBodySchema = z.object({
        description: z.string(),
        type: z.enum(['income', 'outcome']),
        category: z.string(),
        price: z.number()
      });

      const { 
        description,
        type,
        category,
        price
      } = createTransactionBodySchema.parse(request.body);

      await prisma.transaction.create({
        data: {
          description,
          type,
          category,
          price,
          user_id: user.id
        }
      });

      return reply.status(201).send();
    });
}