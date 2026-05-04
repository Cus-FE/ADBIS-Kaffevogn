export class PlaceringsPlan {
  constructor(placering, fraTidspunkt, tilTidspunkt) {
    this.placering = placering;
    this.fraTidspunkt = fraTidspunkt; // "HH:MM"
    this.tilTidspunkt = tilTidspunkt; // "HH:MM"
  }

  erÅbenKl(tidspunkt) {
    if (!this.fraTidspunkt || !this.tilTidspunkt) return true;
    const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    const tid = toMin(tidspunkt);
    return tid >= toMin(this.fraTidspunkt) && tid <= toMin(this.tilTidspunkt);
  }
}
