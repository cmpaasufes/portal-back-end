// import { Model } from 'mongoose';
// import { Injectable, Inject } from '@nestjs/common';
// import { User } from './user.interface';

// @Injectable()
// export class CatsService {
//   constructor(
//     @Inject('CAT_MODEL')
//     private readonly catModel: Model<User>,
//   ) {}

//   async create(body) {
//     const createdCat = new this.catModel();
//     createdCat.
//     return await createdCat.save();
//   }

//   async findAll(): Promise<Cat[]> {
//     return await this.catModel.find().exec();
//   }
// }