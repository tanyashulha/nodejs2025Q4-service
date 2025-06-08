import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteArtistService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createArtist(id: string) {
    return await this.favoritesDBService.favoriteArtists.create({
      data: { artistId: id },
      select: { artist: true },
    });
  }

  async deleteArtist(id: string) {
    return await this.favoritesDBService.favoriteArtists.delete({
      where: { artistId: id },
    });
  }
}
