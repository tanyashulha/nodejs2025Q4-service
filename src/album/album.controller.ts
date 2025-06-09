import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';
import { Album } from 'src/entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async post(@Body() dto: CreateAlbumDto) {
    return await this.albumService.post(dto);
  }

  @Get()
  async getAllAlbums() {
    const albums = await this.albumService.getAllAlbums();

    return albums.map((album) => new Album(album));
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getAlbumById(id);
  }

  @Put(':id')
  async updateAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return await this.albumService.updateAlbumById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.deleteAlbumById(id);
  }
}
