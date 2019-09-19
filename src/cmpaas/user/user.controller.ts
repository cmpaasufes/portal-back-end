import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Request,
  Param
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody, ApiBearerAuth, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { MessageErrors } from '../common/errors'

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'New user was created.'})
  @ApiResponse({ status: 404, description: 'New user was not created.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitBody({ name: 'CreateUserDto', required: true, type: CreateUserDto })
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      let result = await this.userService.create(createUserDto);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"This username or e-mail is already taken"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'User was find.'})
  @ApiResponse({ status: 404, description: 'User was not found.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  async findOne(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.username);
  }

  @Get('/email/:email')
  @ApiResponse({ status: 200, description: 'Email was found.'})
  @ApiResponse({ status: 404, description: 'Email wasn t found.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'email',
    description: 'check email',
    required: true,
    type: String,
  })
  async checkEmail(@Res() res, @Param() param) {
    try {
      let result = await this.userService.checkEmail(param.email);
      if (result != null) {
        res.status(HttpStatus.OK).send(MessageErrors.emailFound);
      } else {
        res.status(HttpStatus.NOT_FOUND).send(MessageErrors.emailNotFound)
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }

  @Get('/username/:username')
  @ApiResponse({ status: 200, description: 'Username was found.'})
  @ApiResponse({ status: 404, description: 'Username wasn t found.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitParam({
    name: 'username',
    description: 'check username',
    required: true,
    type: String,
  })
  async checkUsername(@Res() res, @Param() param) {
    try {
      let result = await this.userService.checkUsername(param.username);
      if (result != null) {
        res.status(HttpStatus.OK).send(MessageErrors.usernameFound);
      } else {
        res.status(HttpStatus.NOT_FOUND).send(MessageErrors.usernameNotFound);
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send(err.message);
    }
  }
}
