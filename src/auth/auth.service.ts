import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      //   throw new HttpException(
      //     { status: false, message: 'Invalid credentials' },
      //     HttpStatus.UNAUTHORIZED,
      //   );
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      };
    }

    const userinfo = {
      _id: user?._id?.toString(),
      name: user?.name,
      email: user?.email,
    };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign(userinfo, jwtSecret, { expiresIn: '1h' });
    return {
      status: HttpStatus.OK,
      message: 'Login successful',
      token,
      data: userinfo,
    };
  }
}
