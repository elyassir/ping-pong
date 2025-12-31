
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async getMe(user) {
        return this.prisma.user.findUnique({
            where: { id: user.id },
        });
    }
    async googleLogin(user: any) {
        if (!user) {
            throw new BadRequestException('Unauthenticated');
        }

        // Check if user exists
        const fusername = user.email;
        let existingUser = await this.prisma.user.findUnique({
            where: { fusername },
        });

        if (!existingUser) {
            // Create new user
            // Generate a username from email (remove special chars)
            // TODO: Make this better
            let username = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

            // Ensure username is not empty
            if (!username) {
                username = `user${Math.floor(Math.random() * 10000)}`;
            }

            // Check if username taken, strict uniqueness check could be loop, but for now try once
            const usernameCheck = await this.prisma.user.findUnique({ where: { username } });
            if (usernameCheck) {
                username = `${username}${Math.floor(Math.random() * 1000)}`;
            }

            existingUser = await this.prisma.user.create({
                data: {
                    fusername: fusername,
                    username: username,
                    real_name: `${user.firstName} ${user.lastName}`,
                    image: user.picture,
                    // Defaults for other fields should be handled by Prisma @default
                },
            });
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username,
            eligible: true
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: existingUser,
        };
    }

    async fortyTwoLogin(user: any) {
        if (!user) {
            throw new BadRequestException('Unauthenticated');
        }

        // Check if user exists
        const fusername = user.email;
        let existingUser = await this.prisma.user.findUnique({
            where: { fusername },
        });

        if (!existingUser) {
            // Create new user
            // Generate a username from email (remove special chars)
            // TODO: Make this better
            let username = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');

            // Ensure username is not empty
            if (!username) {
                username = `user${Math.floor(Math.random() * 10000)}`;
            }

            // Check if username taken, strict uniqueness check could be loop, but for now try once
            const usernameCheck = await this.prisma.user.findUnique({ where: { username } });
            if (usernameCheck) {
                username = `${username}${Math.floor(Math.random() * 1000)}`;
            }

            existingUser = await this.prisma.user.create({
                data: {
                    fusername: fusername,
                    username: username,
                    real_name: `${user.firstName} ${user.lastName}`,
                    image: user.picture,
                    // Defaults for other fields should be handled by Prisma @default
                },
            });
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username,
            eligible: true
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: existingUser,
        };
    }
}
