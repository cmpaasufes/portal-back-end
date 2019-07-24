import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from '../database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...userProviders],
})
export class CmpaasModule {}