import { IsNumber, IsString } from 'class-validator';
import { IsNullable } from 'src/is-null';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsNullable()
  artistId: string;
}
