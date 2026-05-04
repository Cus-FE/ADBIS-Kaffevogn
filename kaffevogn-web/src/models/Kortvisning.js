export class Kortvisning {
  constructor(vogne) {
    this.vogne = vogne;
    this.aktivtFilter = 'alle';
  }
  setFilter(filter) { this.aktivtFilter = filter; }
  hentFilteredVogne() {
    if (this.aktivtFilter === 'aaben') return this.vogne.filter(v => v.erAktiv());
    if (this.aktivtFilter === 'planlagt') return this.vogne.filter(v => v.erPlanlagt());
    return this.vogne;
  }
  hentNærliggendeVogne(brugerKoordinat, radius = 2000) {
    return this.vogne.filter(v => {
      const afstand = v.placering.koordinat.beregnAfstand(brugerKoordinat);
      return afstand <= radius;
    });
  }
}
