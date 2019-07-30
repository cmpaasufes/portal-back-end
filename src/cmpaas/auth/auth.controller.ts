import { Controller, Get, Post, UseGuards,Res, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';



@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Res() res, @Body() createCatDto) {
    try {
      let result =  await this.authService.login(createCatDto);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).send([]);
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

}