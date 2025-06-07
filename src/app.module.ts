import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { UserDBModule } from './db/user-db/user-db.module';
import { ArtistDBModule } from './db/artist-db/artist-db.module';
import { AlbumDBModule } from './db/album-db/album-db.module';
import { TrackDBModule } from './db/track-db/track-db.module';

@Module({
  imports: [
    TrackModule,
    FavoritesModule,
    ArtistModule,
    UserModule,
    AlbumModule,
    UserDBModule,
    ArtistDBModule,
    TrackDBModule,
    AlbumDBModule,
  ],
})
export class AppModule {}
