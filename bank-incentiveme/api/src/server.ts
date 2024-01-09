import { app } from './app';
import { appRoutes } from './routes';

app.register(appRoutes);

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!');
});