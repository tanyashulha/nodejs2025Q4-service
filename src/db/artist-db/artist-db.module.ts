import { Global, Module } from '@nestjs/common';
import { ArtistDBService } from './artist-db.service';

@Global()
@Module({
  providers: [ArtistDBService],
  exports: [ArtistDBService],
})
export class ArtistDBModule {}
