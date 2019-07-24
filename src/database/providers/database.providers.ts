import * as mongoose from 'mongoose';
import { BancoConfig } from './database.config';

const config = new BancoConfig();
export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
    // await mongoose.connect('mongodb://root:example@172.29.0.2:27017'),
      await mongoose.connect( config.uri.toString()),
  },
];
