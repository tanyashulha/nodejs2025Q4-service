import { Global, Module } from '@nestjs/common';
import { AlbumDBService } from './album-db.service';

@Global()
@Module({
  providers: [AlbumDBService],
  exports: [AlbumDBService],
})
export class AlbumDBModule {}
