export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(params) {
    Object.assign(this, params);
  }
}
