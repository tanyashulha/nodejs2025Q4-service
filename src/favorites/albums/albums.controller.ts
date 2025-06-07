import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteAlbumService } from './albums.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites/albums')
export class FavoriteAlbumController {
  constructor(private service: FavoriteAlbumService) {}

  @Post(':id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const addedAlbum = await this.service.createAlbum(id);
    if (addedAlbum) return addedAlbum;
    throw new UnprocessableEntityException();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const deletedAlbum = await this.service.deleteAlbum(id);
    if (deletedAlbum) return deletedAlbum;
    throw new NotFoundException();
  }
}
