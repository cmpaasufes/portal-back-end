import { Module } from '@nestjs/common';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [...userProviders],
})
export class CmpaasModule {}