import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://lukas.gomes2010@gmail.com:hyen135246@smtp.gmail.com',
        defaults: {
          from:'"CMPAAS" <noreply@gmail.com>',
        },
      }),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}