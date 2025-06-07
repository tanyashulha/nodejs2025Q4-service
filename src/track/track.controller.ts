import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  post(@Body() dto: CreateTrackDto) {
    const track = this.trackService.post(dto);

    return new Track(track);
  }

  @Get()
  async getAllTracks() {
    const tracks = await this.trackService.getAllTracks();
    return tracks.map((track) => new Track(track));
  }

  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const existingTrack = await this.trackService.getTrackById(id);
    if (existingTrack) return new Track(existingTrack);

    throw new NotFoundException();
  }

  @Put(':id')
  async updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.updateTrackById(id, dto);
    if (updatedTrack) return true;

    throw new NotFoundException();
  }

  @Delete(':id')
  async deleteTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const isTrackDeleted = await this.trackService.deleteTrackById(id);
    if (isTrackDeleted) return true;
    throw new NotFoundException();
  }
}
