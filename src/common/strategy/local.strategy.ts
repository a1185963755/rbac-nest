import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authsevice: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.authsevice.validateUser(username, password);
    return user;
  }
}
