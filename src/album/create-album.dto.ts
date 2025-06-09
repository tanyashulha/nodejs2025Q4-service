import { IsNumber, IsString } from 'class-validator';
import { IsNullable } from 'src/track/is-nullable';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsNullable()
  @IsString()
  artistId: string | null;
}
