export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(params) {
    Object.assign(this, params);
  }
}
