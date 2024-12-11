import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Query,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IsPublic } from 'src/common/decorator/is-public/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Get('init')
  init() {
    return this.userService.initData();
  }
  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUser: UserLoginDto, @Req() request: Request) {
    const user = await this.userService.login(loginUser);
    const access_token = this.jwtService.sign(
      {
        user: {
          userId: user.id,
          roles: user.roles,
        },
      },
      {
        expiresIn: '30m',
        secret: 'access_token',
      },
    );
    const refresh_token = this.jwtService.sign(
      {
        user: {
          userId: user.id,
        },
      },
      {
        expiresIn: '7d',
        secret: 'refresh_token',
      },
    );

    return { access_token, refresh_token };
  }
  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken, {
        secret: 'refresh_token',
      });

      const user = await this.userService.findUserById(data.userId);
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '30m',
          secret: 'access_token',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
          secret: 'refresh_token',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @IsPublic()
  @UseGuards(AuthGuard('github'))
  @Get('github-login')
  async githubLogin() {}

  // @Get('callback/github')
  // @IsPublic()
  // @UseGuards(AuthGuard('github'))
  // async authCallback(@Req() req) {
  //   return req.user;
  // }

  @IsPublic()
  @UseGuards(AuthGuard('google'))
  @Get('google-login')
  async googleLogin() {}

  @IsPublic()
  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    return req.user;
  }
}
