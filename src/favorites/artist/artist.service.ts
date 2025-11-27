import { Injectable } from '@nestjs/common';
import { FavoriesDBService } from 'src/db/favorites-db/favorites-db.service';

@Injectable()
export class FavoriteArtistService {
  constructor(private favoritesDBService: FavoriesDBService) {}

  createArtist(id: string) {
    return this.favoritesDBService.addArtistToFavorites(id);
  }

  deleteArtist(id: string) {
    return this.favoritesDBService.deleteArtistFromFavorites(id);
  }
}
