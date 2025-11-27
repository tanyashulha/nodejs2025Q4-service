import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoriteAlbumModule } from './album/album.module';
import { FavoriteArtistModule } from './artist/artist.module';
import { FavoriteTrackModule } from './track/track.module';

@Module({
  imports: [FavoriteAlbumModule, FavoriteArtistModule, FavoriteTrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
