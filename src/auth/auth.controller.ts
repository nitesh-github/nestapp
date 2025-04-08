import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // POST /api/auth/login
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
