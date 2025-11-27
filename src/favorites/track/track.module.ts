import { Module } from '@nestjs/common';
import { FavoriteTrackController } from './track.controller';
import { FavoriteTrackService } from './track.service';

@Module({
  controllers: [FavoriteTrackController],
  providers: [FavoriteTrackService],
})
export class FavoriteTrackModule {}
