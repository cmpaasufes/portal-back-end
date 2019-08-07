import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Version } from './interfaces/version.interface';
import { CreateVersionDto } from './dto/create-version.dto';

@Injectable()
export class VersionService {
  constructor(
    @Inject('VersionConnectionToken')
    private readonly versionModel: Model<Version>,
  ) {}

  async create(createVersionrDto: CreateVersionDto) {
    let map;
    try {
      map = new this.versionModel(createVersionrDto);
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Version[]> {
    return await this.versionModel.find().exec();
  }

  async findOne(author: string): Promise<Version> {
    let result;
    result = await this.versionModel.findOne({ author: author }).exec();
    return result;
  }

}
