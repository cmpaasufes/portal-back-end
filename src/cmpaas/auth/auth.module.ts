import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants, smtpConstants } from './constants';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import * as path from 'path'

@Module({
  imports: [
    UserModule,
    PassportModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: smtpConstants.transport,
        defaults: {
          from:'"CMPAAS" <noreply@gmail.com>',
        },
        template: {
          dir: path.join(__dirname, '../../../', 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
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