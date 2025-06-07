import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';
import { AlbumDBService } from 'src/db/album-db/album-db.service';

@Injectable()
export class AlbumService {
  constructor(private albumDBService: AlbumDBService) {}

  post(dto: CreateAlbumDto) {
    return this.albumDBService.add(dto);
  }

  getAllAlbums() {
    return this.albumDBService.getAllAlbums();
  }

  getAlbumById(id: string) {
    return this.albumDBService.getAlbumById(id);
  }

  updateAlbumById(id: string, dto: UpdateAlbumDto) {
    return this.albumDBService.updateAlbumById({ ...dto, id });
  }

  deleteAlbumById(id: string) {
    return this.albumDBService.deleteAlbumById(id);
  }
}
