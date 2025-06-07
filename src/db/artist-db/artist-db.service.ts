import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IArtist } from 'src/intefaces/artist.interface';
import { v4 as uuid } from 'uuid';
import { FavoriesDBService } from '../favorites-db/favorites-db.service';

@Injectable()
export class ArtistDBService {
  artists = new Map<string, IArtist>();

  constructor(
    @Inject(forwardRef(() => FavoriesDBService))
    private favoritesDBService: FavoriesDBService,
  ) {}

  async add(artist: IArtist): Promise<IArtist> {
    const id = uuid();
    const createdArtist: IArtist = {
      id,
      name: artist.name,
      grammy: artist.grammy,
    };

    this.artists.set(id, createdArtist);
    return createdArtist;
  }

  async getAllArtists(): Promise<Array<IArtist>> {
    return Array.from(this.artists.values());
  }

  getArtistById(id: string): IArtist {
    return this.artists.get(id);
  }

  async updateArtistById(artist: IArtist): Promise<IArtist> {
    const existingArtist = this.artists.get(artist.id);
    if (existingArtist) {
      const updatedArtist: IArtist = {
        ...artist,
        name: artist.name,
        grammy: artist.grammy,
      };
      this.artists.set(artist.id, updatedArtist);

      return updatedArtist;
    }
  }

  async deleteArtistById(id: string): Promise<IArtist> {
    const existingArtist = this.artists.get(id);

    if (!existingArtist) return;

    this.artists.delete(id);
    this.favoritesDBService.favorites.artists =
      this.favoritesDBService.favorites.artists.filter(
        (artistId) => artistId !== id,
      );

    return existingArtist;
  }
}
