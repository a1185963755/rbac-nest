import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '405226102162-1n0flu47rl6q1re9ciq1rfgm6ma36sdk.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/user/callback/google',
      scope: ['email', 'profile'],
      consumerKey: '',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return user;
  }
}
