import { Injectable } from '@nestjs/common';
import { FavoriesDBService } from 'src/db/favorites-db/favorites-db.service';

@Injectable()
export class FavoriteTrackService {
  constructor(private favoritesDBService: FavoriesDBService) {}

  createTrack(id: string) {
    return this.favoritesDBService.addTrackToFavorites(id);
  }

  deleteTrack(id: string) {
    return this.favoritesDBService.deleteTrackFromFavorites(id);
  }
}
