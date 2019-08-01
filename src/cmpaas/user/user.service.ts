import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserConnectionToken')
    private readonly userModel: Model<User>,
  ) {}

  saltRounds = 10;
  async create(createUserDto: CreateUserDto) {
    let user;
    try {
      createUserDto.password = await bcrypt.hashSync(
        createUserDto.password,
        this.saltRounds,
      );
      user = new this.userModel(createUserDto);
      return await user.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    let result;
    result = await this.userModel.findOne({ username: username }).exec();
    return result
  }

  async findEmail(email: string): Promise<User> {
    let result;
    result = await this.userModel.findOne({ email: email }).exec();
    return result
  }
}
