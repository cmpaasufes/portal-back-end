import { Module } from '@nestjs/common';
import { mapProviders } from './map.provider';
import { DatabaseModule } from '../../database/database.module';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { VersionModule } from '../version/version.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [DatabaseModule, VersionModule, UserModule],
  controllers: [MapController],
  providers: [...mapProviders, MapService],
  exports: [...mapProviders, MapService]
})
export class MapModule {}