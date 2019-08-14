import { Controller, Get, Post, UseGuards,Res,Request, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody, ApiResponse } from '@nestjs/swagger';
import { UserLoginDto } from './dto/login.dto';
import { ResetLoginDto } from './dto/reset-login.dto';



@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Login aproved.'})
  @ApiResponse({ status: 404, description: 'Login was not approved.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitBody({ name: 'body', required: true, type: UserLoginDto })
  async login(@Res() res, @Request() req) {
    try {
      let result =  await this.authService.login(req.user);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"username or password invalid"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  
  @Post('reset/password')
  @ApiResponse({ status: 200, description: 'Email aproved.'})
  @ApiResponse({ status: 404, description: 'Email was not approved.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitBody({ name: 'body', required: true, type: ResetLoginDto })
  async sendEmail(@Res() res, @Body() email) {
    try {
      let result =  await this.authService.sendEmail(email.email);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"e-mail not found"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('new/password')
  @ApiResponse({ status: 200, description: 'Password was changed.'})
  @ApiResponse({ status: 404, description: 'Password was not approved.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiBearerAuth()
  @ApiImplicitBody({ name: 'body', required: true, type: UserLoginDto })
  async newPassword(@Res() res, @Body() user, @Request() req) {
    try {
      let result =  await this.authService.checkEmailToken(user, req.user);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"token invalid"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

}