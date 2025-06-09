import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  artistId: string;

  @IsString()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
