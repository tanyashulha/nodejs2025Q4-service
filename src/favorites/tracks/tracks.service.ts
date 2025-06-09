import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataBaseService } from 'src/db/db.service';

@Injectable()
export class FavoriteTrackService {
  constructor(private favoritesDBService: DataBaseService) {}

  async createTrack(id: string) {
    const track = await this.favoritesDBService.favoriteTracks.create({
      data: { trackId: id },
      select: { track: true },
    });

    if (track) return track;
    throw new UnprocessableEntityException();
  }

  async deleteTrack(trackId: string) {
    const track = await this.favoritesDBService.favoriteTracks.findUnique({
      where: { trackId },
    });

    if (!track) throw new NotFoundException();

    await this.favoritesDBService.favoriteTracks.delete({
      where: { trackId },
    });
  }
}
