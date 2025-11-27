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
import { FavoriteTrackService } from './track.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs/track')
export class FavoriteTrackController {
  constructor(private service: FavoriteTrackService) {}

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id', ParseUUIDPipe) id: string) {
    const addedTrack = await this.service.createTrack(id);
    if (addedTrack) return addedTrack;
    throw new UnprocessableEntityException();
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deletedTrack = await this.service.deleteTrack(id);
    if (deletedTrack) return deletedTrack;
    throw new NotFoundException();
  }
}
