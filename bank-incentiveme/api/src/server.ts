import { app } from './app';
import { transactionsRoute } from './routes/transactions.route';
import { authRoute } from './routes/auth.route';
import cors from '@fastify/cors';

app.register(cors);
app.register(transactionsRoute, {
  prefix: 'transactions'
});
app.register(authRoute);

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!');
});