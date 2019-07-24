import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';


@Module({
  imports: [],
  controllers: [],
  providers: [...userProviders],
})
export class UserModule {}