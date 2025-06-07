import { Global, Module } from '@nestjs/common';
import { UserDBService } from './user-db/user-db.service';
import { TrackDBService } from './track-db/track-db.service';
import { FavoriesDBService } from './favorites-db/favorites-db.service';
import { ArtistDBService } from './artist-db/artist-db.service';
import { AlbumDBService } from './album-db/album-db.service';

@Global()
@Module({
  providers: [
    UserDBService,
    TrackDBService,
    FavoriesDBService,
    ArtistDBService,
    AlbumDBService,
  ],
  exports: [
    UserDBService,
    TrackDBService,
    FavoriesDBService,
    ArtistDBService,
    AlbumDBService,
  ],
})
export class DatabaseModule {}
