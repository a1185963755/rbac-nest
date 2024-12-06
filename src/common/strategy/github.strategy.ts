import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'Ov23liHAZy1D2ZqbOPCT',
      clientSecret: '4e043e47a8459ddc6bf6e1225074c12421c5342f',
      callbackURL: 'http://localhost:3000/user/callback',
      scope: ['public_profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('🚀 ~ GithubStrategy ~ validate ~ refreshToken:', refreshToken);
    console.log('🚀 ~ GithubStrategy ~ validate ~ accessToken:', accessToken);
    return profile;
  }
}
