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
import { CreateTrackDto } from './create-track-dto';
import { UpdateTrackDto } from './update-track-dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  post(@Body() dto: CreateTrackDto) {
    return this.trackService.post(dto);
  }

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const existingTrack = await this.trackService.getTrackById(id);
    if (existingTrack) return existingTrack;

    throw new NotFoundException();
  }

  @Put(':id')
  async updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.updateTrackById(id, dto);
    if (updatedTrack) return updatedTrack;

    throw new NotFoundException();
  }

  @Delete(':id')
  async deleteTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const isTrackDeleted = await this.trackService.deleteTrackById(id);
    if (!isTrackDeleted) throw new NotFoundException();

    return '';
  }
}
