import { Module } from '@nestjs/common';
import { versionProviders } from './version.provider';
import { DatabaseModule } from '../../database/database.module';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';


@Module({
  imports: [DatabaseModule],
  controllers: [VersionController],
  providers: [...versionProviders, VersionService],
  exports: [...versionProviders, VersionService]
})
export class VersionModule {}