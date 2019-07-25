import { Connection } from 'mongoose';
import { userSchema } from './schemas/user.schema';

export const userProviders = [
  {
    provide: 'UserConnectionToken',
    useFactory: (connection: Connection) => connection.model('User', userSchema),
    inject: ['DbConnectionToken'],
  },
];