import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsString()
  artistId: string;

  @IsString()
  albumId: string;

  @IsNumber()
  duration: number;
}
