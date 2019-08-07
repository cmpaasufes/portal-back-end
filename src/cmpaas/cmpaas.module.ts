import { Module } from '@nestjs/common';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MapModule } from './map/map.module';
import { VersionModule } from './version/version.module';


@Module({
  imports: [DatabaseModule, UserModule, AuthModule, MapModule, VersionModule],
  controllers: [],
  providers: [...userProviders],
})
export class CmpaasModule {}