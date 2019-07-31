import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MailerService } from '@nest-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
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

  public example(): void {
    console.log("entrei")
    this
      .mailerService
      .sendMail({
        to: '', // sender address
        // from: 'lukas.gomes2010@gmail.com', // list of receivers
        subject: 'Resete sua senha', // Subject line
        text: 'mensagem de teste para resetar sua senha', // plaintext body
        // html: '<b>link</b>', // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

}