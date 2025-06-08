import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private albumDBService: DataBaseService) {}

  post(data: CreateAlbumDto) {
    return this.albumDBService.album.create({ data });
  }

  getAllAlbums() {
    return this.albumDBService.album.findMany();
  }

  getAlbumById(id: string) {
    return this.albumDBService.album.findUnique({
      where: { id },
    });
  }

  async updateAlbumById(id: string, dto: UpdateAlbumDto) {
    return await this.albumDBService.album.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAlbumById(id: string) {
    return await this.albumDBService.album.delete({
      where: { id },
    });
  }
}
