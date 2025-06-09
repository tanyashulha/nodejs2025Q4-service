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
import { TrackService } from './track.service';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { Track } from 'src/entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  async post(@Body() dto: CreateTrackDto) {
    return await this.trackService.post(dto);
  }

  @Get()
  async getAllTracks() {
    const tracks = await this.trackService.getAllTracks();
    return tracks.map((track) => new Track(track));
  }

  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.getTrackById(id);
  }

  @Put(':id')
  async updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrackById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.deleteTrackById(id);
  }
}
