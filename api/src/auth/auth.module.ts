import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../modules/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FortyTwoStrategy } from './forty-two.strategy';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [GoogleStrategy, JwtStrategy, AuthService, FortyTwoStrategy],
    exports: [AuthService]
})
export class AuthModule { }