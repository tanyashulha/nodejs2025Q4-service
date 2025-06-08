import { Module } from '@nestjs/common';
// import { TrackModule } from './track/track.module';
// import { FavoritesModule } from './favorites/favorites.module';
// import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
// import { AlbumModule } from './album/album.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [
    // TrackModule,
    // FavoritesModule,
    // ArtistModule,
    UserModule,
    // AlbumModule,
    DatabaseModule,
  ],
})
export class AppModule {}
