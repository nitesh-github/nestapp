import { Module } from '@nestjs/common';
//import { AdminUsersController } from './users/admin-users.controller';
import { AdminUsersModule } from './users/admin-users.module';
import { RouterModule } from '@nestjs/core';
@Module({
  imports: [
    AdminUsersModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [
          {
            path: '',
            module: AdminUsersModule,
          },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
