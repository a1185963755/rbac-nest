import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/common/strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { GithubStrategy } from 'src/common/strategy/github.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GithubStrategy],
})
export class AuthModule {}
