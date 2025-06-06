import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/intefaces/artist.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistDBService {
  artists = new Map<string, IArtist>();

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

  async getArtistById(id: string): Promise<IArtist> {
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

    return existingArtist;
  }
}
