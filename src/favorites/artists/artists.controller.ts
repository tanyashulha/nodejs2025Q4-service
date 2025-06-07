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
import { FavoriteArtistService } from './artists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites/artists')
export class FavoriteArtistController {
  constructor(private service: FavoriteArtistService) {}

  @Post(':id')
  @HttpCode(201)
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    const addedArtist = await this.service.createArtist(id);
    if (addedArtist) return addedArtist;
    throw new UnprocessableEntityException();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const deletedArtist = await this.service.deleteArtist(id);
    if (deletedArtist) return true;
    throw new NotFoundException();
  }
}
