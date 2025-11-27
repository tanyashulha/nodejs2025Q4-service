import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { TrackDBService } from 'src/db/track-db/track-db.service';

@Injectable()
export class TrackService {
  constructor(private trackDBService: TrackDBService) {}

  async post(dto: CreateTrackDto) {
    return await this.trackDBService.add(dto);
  }

  async getAllTracks() {
    return await this.trackDBService.getAllTracks();
  }

  async getTrackById(id: string) {
    return await this.trackDBService.getTrackById(id);
  }

  async updateTrackById(id: string, dto: UpdateTrackDto) {
    return await this.trackDBService.updateTrackById({ ...dto, id });
  }

  async deleteTrackById(id: string) {
    return await this.trackDBService.deleteTrackById(id);
  }
}
