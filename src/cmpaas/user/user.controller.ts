import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiImplicitBody({ name: 'body', required: true, type: CreateUserDto })
  async create(@Res() res, @Body() createCatDto: CreateUserDto) {
    try {
      let result = await this.userService.create(createCatDto);
      if (result != undefined) {
        res.status(HttpStatus.OK).send(result);
      } else {
        res.status(HttpStatus.NOT_FOUND).send([]);
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
