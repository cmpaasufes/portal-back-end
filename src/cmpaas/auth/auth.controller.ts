import { Controller, Get, Post, UseGuards,Res,Request, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Res() res, @Request() req) {
    try {
      let result =  await this.authService.login(req.user);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).send([]);
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @Get('email')
  async sendEmail() {
   await this.authService.example()
  }

}