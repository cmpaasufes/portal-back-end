import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MessageErrors } from '../common/errors'

@Injectable()
export class UserService {
  constructor(
    @Inject('UserConnectionToken')
    private readonly userModel: Model<User>
  ) {}

  saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
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
    return result;
  }

  async findEmail(email: string): Promise<User> {
    let result;
    result = await this.userModel.findOne({ email: email }).exec();
    return result;
  }

  async updatePassword(username, password): Promise<User> {
    let result;
    try {
      result = await this.findOne(username);

      result.password = await bcrypt.hashSync(password, this.saltRounds);

      return await result.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(username): Promise<User> {
    try {
      return await username.save()
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkEmail(email): Promise<User> {
    try {
      return await this.userModel.findOne({email:email}).exec();
    } catch (err) {
      throw new Error(MessageErrors.emailNotFound);
    }
  }

  async checkUsername(username): Promise<User> {
    try {
      return await this.userModel.findOne({username:username}).exec();
    } catch (err) {
      throw new Error(MessageErrors.usernameNotFound);
    }
  }
}
