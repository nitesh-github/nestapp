import {
  Controller,
  Get,
  //Post,
  Param,
  //   Body,
  //   Patch,
  //   Delete,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  private users: User[] = [];
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get('users')
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const data = await this.usersService.findAll(
      parseInt(page),
      parseInt(limit),
    );
    return {
      status: HttpStatus.OK,
      data: data,
    };
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return id;
  }

  //   @Post()
  //   createUser(@Body() userData: { _id: string; name: string }) {
  //     this.users.push(userData);
  //     return { message: 'User created successfully', user: userData };
  //   }

  //   @Patch(':id')
  //   updateUser(@Param('id') id: string, @Body() updatedData: { name: string }) {
  //     const user = this.users.find((user) => user._id === id);
  //     if (user) {
  //       user.name = updatedData.name;
  //       return { message: 'User updated successfully', user };
  //     }
  //     return { message: 'User not found' };
  //   }
  //   @Delete(':id')
  //   deleteUser(@Param('id') id: string) {
  //     this.users = this.users.filter((user) => user._id !== id);
  //     return { message: 'User deleted successfully' };
  //   }
}
