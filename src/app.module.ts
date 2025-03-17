import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config accessible throughout the application
    }),
    MongooseModule.forRoot(process.env.DBURL!), // MongoDB connection URL
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
