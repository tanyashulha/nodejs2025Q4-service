import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteArtistService } from './artists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs/artist')
export class FavoriteArtistController {
  constructor(private service: FavoriteArtistService) {}

  @Post(':id')
  @HttpCode(201)
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.createArtist(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.deleteArtist(id);
  }
}
