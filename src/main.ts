import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'http://localhost:3000', // Allow frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // Allow cookies and authentication headers
    });

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Forcefully exit on failure
  }
}
void bootstrap();
