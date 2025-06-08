import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteTrackService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createTrack(id: string) {
    return await this.favoritesDBService.favoriteTracks.create({
      data: { trackId: id },
      select: { track: true },
    });
  }

  async deleteTrack(id: string) {
    return await this.favoritesDBService.favoriteTracks.delete({
      where: { trackId: id },
    });
  }
}
