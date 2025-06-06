import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './create-artist-dto';
import { UpdateArtistDto } from './update-artist-dto';
import { ArtistDBService } from 'src/db/artist-db/artist-db.service';

@Injectable()
export class ArtistService {
  constructor(private artistDbService: ArtistDBService) {}

  post(dto: CreateArtistDto) {
    return this.artistDbService.add(dto);
  }

  getAllArtists() {
    return this.artistDbService.getAllArtists();
  }

  getArtistById(id: string) {
    return this.artistDbService.getArtistById(id);
  }

  updateArtistById(id: string, dto: UpdateArtistDto) {
    return this.artistDbService.updateArtistById({ ...dto, id });
  }

  deleteArtistById(id: string) {
    return this.artistDbService.deleteArtistById(id);
  }
}
