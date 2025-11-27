import { Module } from '@nestjs/common';
import { FavoriteAlbumController } from './album.controller';
import { FavoriteAlbumService } from './album.service';

@Module({
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService],
})
export class FavoriteAlbumModule {}
