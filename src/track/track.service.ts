import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { TrackDBService } from 'src/db/track-db/track-db.service';

@Injectable()
export class TrackService {
  constructor(private trackDBService: TrackDBService) {}

  async post(dto: CreateTrackDto) {
    return this.trackDBService.add(dto);
  }

  async getAllTracks() {
    return this.trackDBService.getAllTracks();
  }

  async getTrackById(id: string) {
    return this.trackDBService.getTrackById(id);
  }

  async updateTrackById(id: string, dto: UpdateTrackDto) {
    return this.trackDBService.updateTrackById({ ...dto, id });
  }

  async deleteTrackById(id: string) {
    return this.trackDBService.deleteTrackById(id);
  }
}
