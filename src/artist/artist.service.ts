import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './create-artist.dto';
import { UpdateArtistDto } from './update-artist.dto';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private artistDbService: DataBaseService) {}

  post(artist: CreateArtistDto) {
    return this.artistDbService.artist.create({
      data: artist,
    });
  }

  getAllArtists() {
    return this.artistDbService.artist.findMany();
  }

  getArtistById(id: string) {
    return this.artistDbService.artist.findUnique({
      where: { id },
    });
  }

  async updateArtistById(id: string, dto: UpdateArtistDto) {
    return await this.artistDbService.artist.update({
      where: { id },
      data: dto,
    });
  }

  async deleteArtistById(id: string) {
    return await this.artistDbService.artist.delete({
      where: { id },
    });
  }
}
