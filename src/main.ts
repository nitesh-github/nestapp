import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Forcefully exit on failure
  }
}
void bootstrap();
