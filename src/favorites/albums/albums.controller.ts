import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteAlbumService } from './albums.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs/album')
export class FavoriteAlbumController {
  constructor(private service: FavoriteAlbumService) {}

  @Post(':id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.createAlbum(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.deleteAlbum(id);
  }
}
