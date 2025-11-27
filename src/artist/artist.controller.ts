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

    return artist;
  }

  @Get()
  async getAllArtists() {
    return await this.service.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.service.getArtistById(id);
    if (artist) return artist;

    throw new NotFoundException();
  }

  @Put(':id')
  async updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.service.updateArtistById(id, dto);
    if (updatedArtist) return updatedArtist;

    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const isArtistDeleted = await this.service.deleteArtistById(id);
    if (!isArtistDeleted) throw new NotFoundException();
  }
}
