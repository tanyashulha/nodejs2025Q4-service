import { Artist } from './../../entities/artist.entity';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteArtistService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createArtist(id: string) {
    const artist = await this.favoritesDBService.favoriteArtists.create({
      data: { artistId: id },
      select: { artist: true },
    });

    if (artist) return new Artist(artist);
    throw new UnprocessableEntityException();
  }

  async deleteArtist(artistId: string) {
    const artist = await this.favoritesDBService.favoriteArtists.findUnique({
      where: { artistId },
    });

    if (!artist) throw new NotFoundException();

    await this.favoritesDBService.favoriteArtists.delete({
      where: { artistId },
    });
  }
}
