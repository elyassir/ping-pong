import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Parse from raw cookie header
          const cookieHeader = req?.headers?.cookie;
          console.log('Cookie header:', cookieHeader);
          
          if (cookieHeader) {
            const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
              const [key, value] = cookie.trim().split('=');
              acc[key] = value;
              return acc;
            }, {} as Record<string, string>);
            
            console.log('Parsed cookies:', cookies);
            console.log('Access token:', cookies.access_token);
            return cookies.access_token;
          }
          
          return null;

        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // This object is attached to req.user
    return {
      id: payload.id,
      username: payload.username,
      eligible: payload.eligible
    };
  }
}
