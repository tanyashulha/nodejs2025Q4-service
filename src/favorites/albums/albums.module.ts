import { Module } from '@nestjs/common';
import { FavoriteAlbumController } from './albums.controller';
import { FavoriteAlbumService } from './albums.service';

@Module({
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService],
})
export class FavoriteAlbumModule {}
