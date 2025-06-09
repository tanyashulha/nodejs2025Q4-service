import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteTrackService } from './tracks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites/tracks')
export class FavoriteTrackController {
  constructor(private service: FavoriteTrackService) {}

  @Post(':id')
  @HttpCode(201)
  async create(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.createTrack(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.deleteTrack(id);
  }
}
