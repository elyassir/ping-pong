import { Injectable, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';

const url = "https://api.intra.42.fr/oauth/token"

export class AlreadyExistException extends HttpException {
  constructor(user: any) {
    super(user['username'], HttpStatus.FORBIDDEN);
  }
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private confiService: ConfigService, private prismaService: PrismaService) { }

  async getUserToken(query: any) {
    if (query["code"] !== undefined) {
      let data: any;
      try {
        const clientid = this.confiService.get<string>('CLIENTID')
        const secret = this.confiService.get<string>('CLIENTSECRET')
        data = await this.auth_get_token(clientid, secret, query["code"])
        console.log({ data });
        const user = await this.store_user(data)
        console.log({ user });
        return user;
      } catch (error) {
        console.log({ error });
        throw error;
      }
    }
  }

  async auth_get_token(client_id: string, secret: string, code: String) {

    const data = {
      grant_type: 'authorization_code',
      client_id: client_id,
      client_secret: secret,
      code: code,
      redirect_uri: 'http://127.0.0.1:3000/',
    };

    // try {
    const response = await this.httpService.post(url, data).toPromise();
    return response.data;
    // } catch (error) {
    //   throw error.data
    // }
  }

  async store_user(data: any) {
    const token = data["access_token"]
    const url = "https://api.intra.42.fr/v2/me"
    const headersRequest = {
      'Authorization': `Bearer ${token}`,
    };
    const response = await this.httpService.get(url, { headers: headersRequest }).toPromise();
    // try {
    const check = await this.prismaService.user.findFirst({
      where: {
        fusername: response.data['login'],
      },
      select: {
        id: true,
        username: true,
        tfwactivated: true,
        ftime: true
      }
    })
    if (check) {
      return check
    }
    const user = await this.prismaService.user.create({
      data: {
        real_name: response.data["displayname"],
        username: response.data["login"],
        fusername: response.data["login"],
        image: response.data["image"]["versions"]["medium"],
      }
    })
    return user
    // } catch (err) {
    //   throw err
    // }
  }
}
