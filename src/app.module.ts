import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CmpaasModule } from './cmpaas/cmpaas.module';

@Module({
  imports: [DatabaseModule, CmpaasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
