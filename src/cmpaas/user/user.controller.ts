import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'New user was created.'})
  @ApiResponse({ status: 404, description: 'New user was not created.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  @ApiImplicitBody({ name: 'body', required: true, type: CreateUserDto })
  async create(@Res() res, @Body() createCatDto: CreateUserDto) {
    try {
      let result = await this.userService.create(createCatDto);
      if (result != undefined) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).json('{"message":"This username or e-mail is already taken"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiResponse({ status: 200, description: 'User was find.'})
  @ApiResponse({ status: 404, description: 'User was not found.'})
  @ApiResponse({ status: 503, description: 'Server error.'})
  async findOne(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.username);
  }
}
