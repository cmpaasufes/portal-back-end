import { Module } from '@nestjs/common';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [...userProviders],
})
export class CmpaasModule {}