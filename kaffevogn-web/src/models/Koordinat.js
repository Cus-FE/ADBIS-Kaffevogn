export class Koordinat {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
  beregnAfstand(anden) {
    const R = 6371000;
    const dLat = (anden.lat - this.lat) * Math.PI / 180;
    const dLng = (anden.lng - this.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(this.lat * Math.PI/180) * Math.cos(anden.lat * Math.PI/180) *
              Math.sin(dLng/2)**2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  }
}
