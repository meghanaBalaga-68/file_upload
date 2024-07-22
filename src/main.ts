import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //http://10.100.72.203:3000/file/upload
  //http://10.100.72.203:3000/18b0ab81-b6ab-4166-92c4-273b8df51383-17-07-2024_17-20-48.jpg"
  //http://10.100.72.203:3000/file/stream/:id
  app.enableCors({
    origin: 'http://localhost:5174',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Custom-Header',
});

  await app.listen(process.env.PORT ||  3000, '0.0.0.0');
}
bootstrap();