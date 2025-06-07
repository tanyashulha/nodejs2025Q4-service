import { Global, Module } from '@nestjs/common';
import { TrackDBService } from './track-db.service';

@Global()
@Module({
  providers: [TrackDBService],
  exports: [TrackDBService],
})
export class TrackDBModule {}
