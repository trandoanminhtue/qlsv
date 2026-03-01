import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS để frontend React có thể gọi API
  app.enableCors({
    origin: 'http://localhost:5173', // URL của frontend Vite
    credentials: true,
  });

  await app.listen(3000);
  console.log('Backend đang chạy tại: http://localhost:3000');
}
bootstrap();
