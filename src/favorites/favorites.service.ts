import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private favoritesDBService: DataBaseService) {}

  async getAllFavourites() {
    const favoriteArtists =
      await this.favoritesDBService.favoriteArtists.findMany({
        select: { artist: true },
      });

    const favouriteAlbums =
      await this.favoritesDBService.favoriteAlbums.findMany({
        select: { album: true },
      });

    const favoriteTracks =
      await this.favoritesDBService.favoriteTracks.findMany({
        select: { track: true },
      });

    const artists = favoriteArtists.map((v) => v.artist);
    const albums = favouriteAlbums.map((v) => v.album);
    const tracks = favoriteTracks.map((v) => v.track);

    return {
      artists,
      albums,
      tracks,
    };
  }
}
