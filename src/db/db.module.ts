import { Global, Module } from '@nestjs/common';
import { UserDBModule } from './user-db/user-db.module';

@Global()
@Module({
  imports: [UserDBModule],
})
export class DatabaseModule {}
