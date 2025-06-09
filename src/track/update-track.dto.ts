import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId?: string;
}
