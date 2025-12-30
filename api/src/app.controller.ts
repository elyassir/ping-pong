import { Controller, Get, Req, Post, ParamData, Param, Query,Res,UseGuards, UnauthorizedException } from '@nestjs/common';
import { AppService,AlreadyExistException } from './app.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import {UserService} from './modules/users/users.service'
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/auth/callback')
  async auth(@Query() query: any) {
    console.log(query);
    try {
      const resp = await this.appService.getUserToken(query);

      const payload = {
        id: resp.id,
        username: resp.username,
        eligible: !resp.tfwactivated,
      };

      console.log(payload);

      const jwtToken = await this.jwtService.signAsync(payload);

      console.log(jwtToken);

      const newUser = await this.prismaService.user.update({
        where: { username: resp.username },
        data: { jwtToken },
        select: {
          id: true,
          username: true,
          real_name: true,
          bio: true,
          image: true,
          onlineStatus: true,
          tfwactivated: true,
        },
      });

      console.log(newUser);

      return {
        access_token: jwtToken,
        isactivated: newUser.tfwactivated,
        iseligible: !resp.tfwactivated,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof AlreadyExistException) {
        const user = await this.userService.getUserAccessToken(err.message);

        return {
          access_token: user.jwtToken,
          ftime: false,
        };
      }

      throw new UnauthorizedException('Unauthorized');
    }
  }
}


// @methode => to specify the method allowed 
// @httpCode(code) => decorator for specifying the return type of the req