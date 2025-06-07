import { Module } from '@nestjs/common';
import { FavoriteArtistController } from './artists.controller';
import { FavoriteArtistService } from './artists.service';

@Module({
  controllers: [FavoriteArtistController],
  providers: [FavoriteArtistService],
})
export class FavoriteArtistModule {}
