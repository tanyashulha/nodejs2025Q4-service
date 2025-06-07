import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoriteAlbumModule } from './albums/albums.module';
import { FavoriteArtistModule } from './artists/artists.module';
import { FavoriteTrackModule } from './tracks/tracks.module';

@Module({
  imports: [FavoriteAlbumModule, FavoriteArtistModule, FavoriteTrackModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
