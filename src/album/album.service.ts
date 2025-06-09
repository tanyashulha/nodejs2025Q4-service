import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';
import { DataBaseService } from 'src/db/db.service';
import { Album } from 'src/entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private albumDBService: DataBaseService) {}

  async post(data: CreateAlbumDto) {
    const album = await this.albumDBService.album.create({ data });

    if (album) return new Album(album);
    throw new UnprocessableEntityException();
  }

  getAllAlbums() {
    return this.albumDBService.album.findMany();
  }

  async getAlbumById(id: string) {
    const album = await this.albumDBService.album.findUnique({
      where: { id },
    });

    if (!album) throw new NotFoundException();

    return new Album(album);
  }

  async updateAlbumById(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumDBService.album.findUnique({
      where: { id },
    });

    if (!album) throw new NotFoundException();

    return await this.albumDBService.album.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAlbumById(id: string) {
    const album = await this.albumDBService.album.findUnique({
      where: { id },
    });

    if (!album) throw new NotFoundException();

    await this.albumDBService.album.delete({ where: { id } });
  }
}
