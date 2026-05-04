export class Kaffevogn {
  constructor({ id, navn, beskrivelse, placering, placeringsPlan, menu, billedFarve, status }) {
    this.id = id;
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    this.placering = placering;
    this.placeringsPlan = placeringsPlan || null;
    this.menu = menu;
    this.billedFarve = billedFarve;
    this.status = status; // 'aktiv' | 'planlagt' | 'inaktiv'
  }
  erAktiv() { return this.status === 'aktiv'; }
  erPlanlagt() { return this.status === 'planlagt'; }
  erÅbenKl(tidspunkt) {
    if (this.status === 'inaktiv') return false;
    if (!this.placeringsPlan) return this.status === 'aktiv';
    return this.placeringsPlan.erÅbenKl(tidspunkt);
  }
}
