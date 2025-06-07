import { Module } from '@nestjs/common';
import { FavoriteTrackController } from './tracks.controller';
import { FavoriteTrackService } from './tracks.service';

@Module({
  controllers: [FavoriteTrackController],
  providers: [FavoriteTrackService],
})
export class FavoriteTrackModule {}
