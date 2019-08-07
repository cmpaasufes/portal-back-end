import { Connection } from 'mongoose';
import { versionSchema } from './schemas/version.schema';

export const versionProviders = [
  {
    provide: 'VersionConnectionToken',
    useFactory: (connection: Connection) => connection.model('Version', versionSchema),
    inject: ['DbConnectionToken'],
  },
];