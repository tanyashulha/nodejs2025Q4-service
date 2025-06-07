import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IAlbum } from 'src/intefaces/album.interface';
import { v4 as uuid } from 'uuid';
import { FavoriesDBService } from '../favorites-db/favorites-db.service';

@Injectable()
export class AlbumDBService {
  albums = new Map<string, IAlbum>();

  constructor(
    @Inject(forwardRef(() => FavoriesDBService))
    private favoritesDBService: FavoriesDBService,
  ) {}

  async add(album: IAlbum): Promise<IAlbum> {
    const id = uuid();
    const createdAlbum: IAlbum = {
      id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    this.albums.set(id, createdAlbum);
    return createdAlbum;
  }

  async getAllAlbums(): Promise<Array<IAlbum>> {
    return Array.from(this.albums.values());
  }

  getAlbumById(id: string): IAlbum {
    return this.albums.get(id);
  }

  async updateAlbumById(album: IAlbum): Promise<IAlbum> {
    const existingAlbum = this.albums.get(album.id);
    if (existingAlbum) {
      const updatedAlbum: IAlbum = {
        ...album,
        name: album.name,
        year: album.year,
        artistId: album.artistId,
      };
      this.albums.set(album.id, updatedAlbum);

      return updatedAlbum;
    }
  }

  async deleteAlbumById(id: string): Promise<IAlbum> {
    const existingAlbum = this.albums.get(id);
    if (existingAlbum) {
      this.albums.delete(id);
      this.favoritesDBService.favorites.albums =
        this.favoritesDBService.favorites.albums.filter(
          (albumId) => albumId !== id,
        );
      return existingAlbum;
    }
  }
}
