import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db.service';

@Global()
@Module({
  providers: [UserDBService],
  exports: [UserDBService],
})
export class UserDBModule {}
