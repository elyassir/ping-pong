import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from './modules/users/users.module'
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {UserService} from './modules/users/users.service'
import {FriendModule} from './modules/friends/friends.module'
import { NotificationsGateway } from './modules/gateway/events.gateway';
import { MessagesModule } from './modules/messages/message.module';
import { groupModule } from './modules/groups/groups.module';
import { GameModule } from './modules/game/game.module';
import { twoFactorModule } from './modules/tfa/twofactorauth.module';
import { GameService } from './game/game-service/game-service.service';
import { InfoGameGateway } from './game/info-game/info-game.gateway';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }
  ),twoFactorModule,GameModule,groupModule,MessagesModule,NotificationsGateway,UserModule, FriendModule,HttpModule,JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '30d' },
    }),
  }),PrismaModule],
  controllers: [AppController],
  providers: [AppService,UserService,  GameService, InfoGameGateway],
})
export class AppModule {}
