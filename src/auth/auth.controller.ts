import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // POST /api/login
  async login(@Body() body: { email: string; password: string }) {
    console.log('testing9');
    return this.authService.login(body.email, body.password);
  }
}
