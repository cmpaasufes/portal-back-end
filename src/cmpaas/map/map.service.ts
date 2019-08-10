import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Map } from './interfaces/map.interface';
import { CreateMapDto } from './dto/create-map.dto';
import { VersionService } from '../version/version.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MapService {
  constructor(
    @Inject('MapConnectionToken')
    private readonly mapModel: Model<Map>,
    private readonly versionService: VersionService,
    private readonly userService: UserService,
  ) {}

  async create(createMaprDto: any) {
    let map;
    let version;
    try {
      version = await this.versionService.create(createMaprDto);
      map = new this.mapModel(createMaprDto);
      map.last_version = version._id
      map.versions.push(version._id)
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async saveMap(createMaprDto: any, user: any) {
    let map;
    let resultUser;
    try {
      map = await this.create(createMaprDto);
      resultUser = await this.userService.findOne(user.username);
      resultUser.maps.push(map._id);
      return await this.userService.update(resultUser)
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Map[]> {
    return await this.mapModel.find().exec();
  }

  async findOne(author: string): Promise<Map> {
    let result;
    result = await this.mapModel.findOne({ author: author }).exec();
    return result;
  }

}
