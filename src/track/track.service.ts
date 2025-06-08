import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private trackDBService: DataBaseService) {}

  post(track: CreateTrackDto) {
    return this.trackDBService.track.create({
      data: track,
    });
  }

  getAllTracks() {
    return this.trackDBService.track.findMany();
  }

  getTrackById(id: string) {
    return this.trackDBService.track.findUnique({
      where: { id },
    });
  }

  async updateTrackById(id: string, dto: UpdateTrackDto) {
    return await this.trackDBService.track.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTrackById(id: string) {
    return await this.trackDBService.track.delete({
      where: { id },
    });
  }
}
