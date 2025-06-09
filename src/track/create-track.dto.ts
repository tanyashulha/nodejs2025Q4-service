import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNullable } from './is-nullable';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsNullable()
  artistId: string | null;

  @IsString()
  @IsNullable()
  albumId: string | null;
}
