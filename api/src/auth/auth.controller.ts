import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  // Define options as a plain object to avoid Express types
  private readonly accessTokenOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'lax' as const, // Cast to specific literal if strict typing is needed
    path: '/',
  };

  constructor(
    private readonly authService: AuthService, 
    private readonly configService: ConfigService
  ) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { 
    // Guard initiates the Google login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @Redirect() // 1. Use Redirect decorator
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.googleLogin(req.user);
    
    // 2. Set cookie (Requires underlying adapter, usually Express by default)
    res.cookie('access_token', accessToken, this.accessTokenOptions);

    // 3. Return the redirection URL instead of calling res.redirect()
    return { url: this.configService.get<string>('FRONTEND_URL') };
  }

  @Get('42')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(@Req() req) { }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  @Redirect()
  async fortyTwoAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.fortyTwoLogin(req.user);
    
    res.cookie('access_token', accessToken, this.accessTokenOptions);

    return { url: this.configService.get<string>('FRONTEND_URL') };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    return this.authService.getMe(req.user);
  }

  @Get('logout')
  @Redirect()
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    // Clear cookie using the adapter's method
    res.clearCookie('access_token', this.accessTokenOptions);
    
    return { url: this.configService.get<string>('FRONTEND_URL') };
  }
}
/*

framework-agnostic responses

remove express code , use framework-agnostic responses

*/