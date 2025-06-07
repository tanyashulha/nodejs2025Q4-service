import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './create-track.dto';
import { UpdateTrackDto } from './update-track.dto';
import { TrackDBService } from 'src/db/track-db/track-db.service';

@Injectable()
export class TrackService {
  constructor(private trackDBService: TrackDBService) {}

  post(dto: CreateTrackDto) {
    return this.trackDBService.add(dto);
  }

  getAllTracks() {
    return this.trackDBService.getAllTracks();
  }

  getTrackById(id: string) {
    return this.trackDBService.getTrackById(id);
  }

  updateTrackById(id: string, dto: UpdateTrackDto) {
    return this.trackDBService.updateTrackById({ ...dto, id });
  }

  deleteTrackById(id: string) {
    return this.trackDBService.deleteTrackById(id);
  }
}
