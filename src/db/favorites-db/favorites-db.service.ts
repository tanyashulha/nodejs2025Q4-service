import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IAlbum } from 'src/intefaces/album.interface';
import { IArtist } from 'src/intefaces/artist.interface';
import { IFavorites } from 'src/intefaces/favorites.interface';
import { AlbumDBService } from '../album-db/album-db.service';
import { ArtistDBService } from '../artist-db/artist-db.service';
import { ITrack } from 'src/intefaces/track.interface';
import { TrackDBService } from '../track-db/track-db.service';

@Injectable()
export class FavoriesDBService {
  favorites: IFavorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => AlbumDBService))
    private albumDBService: AlbumDBService,
    @Inject(forwardRef(() => ArtistDBService))
    private artistDBService: ArtistDBService,
    @Inject(forwardRef(() => TrackDBService))
    private trackDBService: TrackDBService,
  ) {}

  async getAllFavoriteAlbums(): Promise<Array<IAlbum>> {
    return await this.favorites.albums.map(this.albumDBService.getAlbumById);
  }

  async getAllFavoriteAertists(): Promise<Array<IArtist>> {
    return await this.favorites.artists.map(this.artistDBService.getArtistById);
  }

  async getAllFavoriteTracks(): Promise<Array<ITrack>> {
    return await this.favorites.tracks.map(this.trackDBService.getTrackById);
  }

  async addAlbumToFavorites(id: string): Promise<IAlbum> {
    const existingAlbum = this.albumDBService.getAlbumById(id);
    if (existingAlbum) {
      this.favorites.albums.push(id);
      return existingAlbum;
    }
  }

  async addArtistToFavorites(id: string): Promise<IArtist> {
    const existingArtist = this.artistDBService.getArtistById(id);
    if (existingArtist) {
      this.favorites.artists.push(id);
      return existingArtist;
    }
  }

  async addTrackToFavorites(id: string): Promise<ITrack> {
    const existingTrack = this.trackDBService.getTrackById(id);
    if (existingTrack) {
      this.favorites.tracks.push(id);
      return existingTrack;
    }
  }

  async deleteAlbumFromFavourites(id: string): Promise<IAlbum> {
    const album = this.favorites.albums.find((albumId) => albumId === id);
    if (album) {
      this.favorites.albums = this.favorites.albums.filter(
        (albumId) => albumId !== id,
      );

      return this.albumDBService.getAlbumById(id);
    }
  }

  async deleteArtistFromFavorites(id: string): Promise<IArtist> {
    const artist = this.favorites.artists.find((artistId) => artistId === id);
    if (artist) {
      this.favorites.artists = this.favorites.artists.filter(
        (artistId) => artistId !== id,
      );

      return this.artistDBService.getArtistById(id);
    }
  }

  async deleteTrackFromFavorites(id: string): Promise<ITrack> {
    const existingTrack = this.favorites.tracks.find(
      (trackId) => trackId === id,
    );
    if (existingTrack) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );

      return this.trackDBService.getTrackById(id);
    }
  }
}
