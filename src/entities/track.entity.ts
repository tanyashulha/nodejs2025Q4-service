export class Track {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  constructor(params) {
    Object.assign(this, params);
  }
}
