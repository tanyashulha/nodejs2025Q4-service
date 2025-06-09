import { IsNumber, IsString } from 'class-validator';
import { IsNullable } from 'src/track/is-nullable';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsNullable()
  @IsString()
  artistId: string | null;
}
