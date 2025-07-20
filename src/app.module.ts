import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './api/admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminUsersModule } from './api/admin/users/admin-users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBURL ?? ''),
    AuthModule,
    UsersModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: '/',
            module: AuthModule,
          },
          {
            path: '/',
            module: UsersModule,
          },
          {
            path: 'admin',
            children: [
              {
                path: '/',
                module: AdminUsersModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
