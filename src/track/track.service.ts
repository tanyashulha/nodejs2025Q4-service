import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { DataBaseService } from 'src/db/db.service';
import { Track } from 'src/entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private trackDBService: DataBaseService) {}

  async post(track: CreateTrackDto) {
    const created = await this.trackDBService.track.create({
      data: track,
    });

    return new Track(created);
  }

  getAllTracks() {
    return this.trackDBService.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.trackDBService.track.findUnique({
      where: { id },
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async updateTrackById(id: string, dto: UpdateTrackDto) {
    const updatedTrack = this.trackDBService.track.findUnique({
      where: { id },
    });

    if (!updatedTrack) throw new NotFoundException();

    return await this.trackDBService.track.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTrackById(id: string) {
    const track = await this.trackDBService.track.findUnique({
      where: { id },
    });

    if (!track) throw new NotFoundException();

    await this.trackDBService.track.delete({ where: { id } });
  }
}
