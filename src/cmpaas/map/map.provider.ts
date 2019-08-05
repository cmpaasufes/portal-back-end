import { Connection } from 'mongoose';
import { mapSchema } from './schemas/map.schema';

export const mapProviders = [
  {
    provide: 'MapConnectionToken',
    useFactory: (connection: Connection) => connection.model('Map', mapSchema),
    inject: ['DbConnectionToken'],
  },
];