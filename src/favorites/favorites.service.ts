import { Injectable } from '@nestjs/common';
import { FavoriesDBService } from 'src/db/favorites-db/favorites-db.service';

@Injectable()
export class FavoritesService {
  constructor(private favoritesDBService: FavoriesDBService) {}

  async getAllFavourites() {
    const artists = await this.favoritesDBService.getAllFavoriteAertists();
    const albums = this.favoritesDBService.getAllFavoriteAlbums();
    const tracks = this.favoritesDBService.getAllFavoriteTracks();

    return {
      artists,
      albums,
      tracks,
    };
  }
}
