import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ITrack } from 'src/intefaces/track.interface';
import { v4 as uuid } from 'uuid';
import { FavoriesDBService } from '../favorites-db/favorites-db.service';

@Injectable()
export class TrackDBService {
  tracks = new Map<string, ITrack>();

  constructor(
    @Inject(forwardRef(() => FavoriesDBService))
    private favoritesDBService: FavoriesDBService,
  ) {}

  async add(track: ITrack): Promise<ITrack> {
    const id = uuid();
    const createdTrack: ITrack = {
      id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
    this.tracks.set(id, createdTrack);

    return createdTrack;
  }

  async getAllTracks(): Promise<Array<ITrack>> {
    return Array.from(this.tracks.values());
  }

  getTrackById(id: string): ITrack {
    return this.tracks.get(id);
  }

  async updateTrackById(track: ITrack): Promise<ITrack> {
    const existingTrack = this.tracks.get(track.id);
    if (existingTrack) {
      const updatedTrack: ITrack = {
        ...track,
        name: track.name,
        artistId: track.artistId,
        albumId: track.albumId,
        duration: track.duration,
      };
      this.tracks.set(track.id, updatedTrack);

      return updatedTrack;
    }
  }

  async deleteTrackById(id: string): Promise<ITrack> {
    const existingTrack = this.tracks.get(id);
    if (existingTrack) {
      this.tracks.delete(id);
      this.favoritesDBService.deleteTrackFromFavorites(id);
      return existingTrack;
    }
  }
}
