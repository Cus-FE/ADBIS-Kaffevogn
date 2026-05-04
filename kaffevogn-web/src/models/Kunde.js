import { Bruger } from './Bruger';
import { Favorit } from './Favorit';

export class Kunde extends Bruger {
  constructor(id, navn, email) {
    super(id, navn, email);
    this.favoritter = [];
  }
  tilfoejFavorit(vognId) {
    if (!this.favoritter.find(f => f.vognId === vognId)) {
      this.favoritter.push(new Favorit(vognId));
    }
  }
  fjernFavorit(vognId) {
    this.favoritter = this.favoritter.filter(f => f.vognId !== vognId);
  }
  erFavorit(vognId) {
    return !!this.favoritter.find(f => f.vognId === vognId);
  }
}
