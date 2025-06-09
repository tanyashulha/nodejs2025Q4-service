import { Artist } from './../entities/artist.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './create-artist.dto';
import { UpdateArtistDto } from './update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private service: ArtistService) {}

  @Post()
  post(@Body() dto: CreateArtistDto) {
    const artist = this.service.post(dto);

    return new Artist(artist);
  }

  @Get()
  async getAllArtists() {
    const artists = await this.service.getAllArtists();

    return artists.map((artist) => new Artist(artist));
  }

  @Get(':id')
  async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.service.getArtistById(id);
    if (artist) return new Artist(artist);

    throw new NotFoundException();
  }

  @Put(':id')
  async updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    return await this.service.updateArtistById(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.deleteArtistById(id);
  }
}
