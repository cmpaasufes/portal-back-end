import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Map } from './interfaces/map.interface';
import { CreateMapDto } from './dto/create-map.dto';

@Injectable()
export class MapService {
  constructor(
    @Inject('MapConnectionToken')
    private readonly userModel: Model<Map>,
  ) {}

  async create(createMaprDto: CreateMapDto) {
    let map;
    try {
      map = new this.userModel(createMaprDto);
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Map[]> {
    return await this.userModel.find().exec();
  }

  async findOne(author: string): Promise<Map> {
    let result;
    result = await this.userModel.findOne({ author: author }).exec();
    return result;
  }

}
