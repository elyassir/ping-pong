import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) { }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log("google callback");
    console.log(req.user);
    const { accessToken } = await this.authService.googleLogin(req.user);
    // Set the cookies
    res.cookie('access_token', accessToken, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: false, // REQUIRED for HTTP
      sameSite: 'lax',
      path: '/',

    });

    // Redirect to frontend with token
    console.log("redirecting to frontend");
    console.log(this.configService.get<string>('FRONTEND_URL'));
    res.redirect(`${this.configService.get<string>('FRONTEND_URL')}`);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    return this.authService.getMe(req.user);
  }
}
/*

framework-agnostic responses

remove express code , use framework-agnostic responses

*/