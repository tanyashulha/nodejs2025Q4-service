import { Injectable } from '@nestjs/common';
import { FavoriesDBService } from 'src/db/favorites-db/favorites-db.service';

@Injectable()
export class FavoriteAlbumService {
  constructor(private favoritesDBService: FavoriesDBService) {}

  createAlbum(id: string) {
    return this.favoritesDBService.addAlbumToFavorites(id);
  }

  deleteAlbum(id: string) {
    return this.favoritesDBService.deleteAlbumFromFavourites(id);
  }
}
