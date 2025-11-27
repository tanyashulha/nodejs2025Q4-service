import { IsNumber, IsString } from 'class-validator';
import { IsNullable } from 'src/is-null';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsString()
  @IsNullable()
  artistId: string | null;

  @IsString()
  @IsNullable()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
