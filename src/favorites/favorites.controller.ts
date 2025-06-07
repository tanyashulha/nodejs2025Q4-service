import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAllFavourites() {
    return this.favoritesService.getAllFavourites();
  }
}
