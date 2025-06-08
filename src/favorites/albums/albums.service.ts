import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteAlbumService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createAlbum(id: string) {
    return await this.favoritesDBService.favoriteAlbums.create({
      data: { albumId: id },
      select: { album: true },
    });
  }

  async deleteAlbum(id: string) {
    return await this.favoritesDBService.favoriteAlbums.delete({
      where: { albumId: id },
    });
  }
}
