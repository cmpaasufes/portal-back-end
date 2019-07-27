import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Res() res, @Body() createCatDto: CreateUserDto) {
    try {
      return await this.userService.create(createCatDto);
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post("email")
  async findOne(@Res() res, @Body() createCatDto: CreateUserDto): Promise<User> {
    try {
      let result =  await this.userService.findOne(createCatDto.email);
      console.log(result)
      return result
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }
}
