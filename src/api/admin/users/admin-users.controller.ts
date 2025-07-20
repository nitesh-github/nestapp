import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';

@Controller()
export class AdminUsersController {
  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return id;
  }
}
