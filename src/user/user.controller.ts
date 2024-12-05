import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { UserService } from './user.service';

import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Get('init')
  init() {
    return this.userService.initData();
  }
  @Post('login')
  async login(@Body() loginUser: UserLoginDto) {
    const user = await this.userService.login(loginUser);
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });
    console.log(user);

    return { token };
  }
}
