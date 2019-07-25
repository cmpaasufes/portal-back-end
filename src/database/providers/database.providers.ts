import * as mongoose from 'mongoose';
import { BancoConfig } from './database.config';

const config = new BancoConfig();
export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect( config.uri.toString()),
  },
];
