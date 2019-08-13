import { Model, model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Map } from './interfaces/map.interface';
import { VersionService } from '../version/version.service';
import { UserService } from '../user/user.service';
import { CreateMapDto } from './dto/create-map.dto';

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
      map.last_version = version._id;
      map.versions.push(version._id);
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
      return await this.userService.update(resultUser);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async newContent(editMapDto: any, _id:string,  user: any) {
    let map;
    let version;
    try {
      map = await this.findOne(_id);
      version = await this.versionService.create(editMapDto);
      map.last_version = version._id;
      map.versions.push(version._id);
      return await map.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async editMap(updateMapDto: any, idmap:string ,user: any) {
    let result;
    try {
      result = await this.mapModel.findOneAndUpdate({_id:idmap}, updateMapDto).exec();
      return result
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(user: any): Promise<Map[]> {
    let maps = [];
    let resultUser = await this.userService.findOne(user.username);
    for (let index = 0; index < resultUser.maps.length; index++) {
      maps.push(await this.findOne(resultUser.maps[index]));
    }
    return maps;
  }

  async findAllVersions(id: any, user: any) {
    let versions = [];
    let maps = await this.findOne(id);
    for (let index = 0; index < maps.versions.length; index++) {
      versions.push(await this.versionService.findOne(maps.versions[index]));
    }
    return versions;
  }

  async findOneVersion(idmap: any, idversion: any, user: any) {
    let maps = await this.findOne(idmap);
    let version
    if (maps.versions.includes(idversion)) {
      version = await this.versionService.findOne(idversion);
    }
    return version;
  }

  async findOne(_id: string): Promise<Map> {
    let result;
    result = await this.mapModel.findOne({ _id: _id }).exec();
    return result;
  }
}
