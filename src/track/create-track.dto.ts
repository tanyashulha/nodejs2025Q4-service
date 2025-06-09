import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  albumId?: string;
}
