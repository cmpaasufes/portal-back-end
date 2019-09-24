import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailerService } from '@nest-modules/mailer';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { json } from 'body-parser';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    const password = bcrypt.compareSync(pass, user.password);
    if (user && password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { _id: user._doc._id, username: user._doc.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendEmail(email: string) {
    const user = await this.usersService.findEmail(email);
    if (user) {
      const { password, ...result } = user;
      const token = await this.login(result);
      await this.mailerService.sendMail({
        to: email, // sender address
        // from: 'test.test@gmail.com', // list of receivers
        subject: 'Resete sua senha', // Subject line
        template: 'reset-password',
          context:{
            url: process.env.URL_EMAIL + token.access_token
          }
      });
      const json = await JSON.parse('{"message":"send"}')
      return json
    } else {
      return JSON.parse('{"message":"e-mail not found"}');
    }
  }

  async checkEmailToken(user, req) {
    try {
      const result = await this.usersService.updatePassword(
        req.username,
        user.password,
      );
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
