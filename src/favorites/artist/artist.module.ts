import { Module } from '@nestjs/common';
import { FavoriteArtistController } from './artist.controller';
import { FavoriteArtistService } from './artist.service';

@Module({
  controllers: [FavoriteArtistController],
  providers: [FavoriteArtistService],
})
export class FavoriteArtistModule {}
