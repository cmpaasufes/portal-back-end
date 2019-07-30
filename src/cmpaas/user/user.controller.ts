import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post("login")
  async findOne(@Res() res, @Body() createCatDto: CreateUserDto){
    try {
      let result =  await this.userService.findOne(createCatDto.username);
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
