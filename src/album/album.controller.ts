import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './create-album.dto';
import { UpdateAlbumDto } from './update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  post(@Body() dto: CreateAlbumDto) {
    return this.albumService.post(dto);
  }

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (album) return album;

    throw new NotFoundException();
  }

  @Put(':id')
  async updateAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumService.updateAlbumById(id, dto);
    if (updatedAlbum) return updatedAlbum;

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const isAlbumDeleted = await this.albumService.deleteAlbumById(id);
    if (isAlbumDeleted) return true;
    throw new NotFoundException();
  }
}
