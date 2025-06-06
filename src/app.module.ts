import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { UserDBModule } from './db/user-db/user-db.module';
import { ArtistDBModule } from './db/artist-db/artist-db.module';

@Module({
  imports: [
    TrackModule,
    FavoritesModule,
    ArtistModule,
    UserModule,
    AlbumModule,
    UserDBModule,
    ArtistDBModule,
  ],
})
export class AppModule {}
