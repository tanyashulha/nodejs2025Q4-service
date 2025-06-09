import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteAlbumService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createAlbum(id: string) {
    const album = await this.favoritesDBService.favoriteAlbums.create({
      data: { albumId: id },
      select: { album: true },
    });

    if (album) return album;
    throw new UnprocessableEntityException();
  }

  async deleteAlbum(albumId: string) {
    const album = await this.favoritesDBService.favoriteAlbums.findUnique({
      where: { albumId },
    });

    if (!album) throw new NotFoundException();

    await this.favoritesDBService.favoriteAlbums.delete({
      where: { albumId },
    });
  }
}
