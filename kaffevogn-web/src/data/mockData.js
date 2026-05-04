import { Koordinat } from '../models/Koordinat';
import { Placering } from '../models/Placering';
import { PlaceringsPlan } from '../models/PlaceringsPlan';
import { Vare } from '../models/Vare';
import { Menu } from '../models/Menu';
import { Kaffevogn } from '../models/Kaffevogn';
import { Kunde } from '../models/Kunde';
import { Kortvisning } from '../models/Kortvisning';

export const mockVogne = [
  new Kaffevogn({
    id: 1, navn: "Nørreport Kaffe",
    beskrivelse: "Specialkaffe og hjemmebagte croissanter ved Nørreport",
    placering: new Placering(new Koordinat(55.6833, 12.5704), "Nørreport Station, 1358 København K"),
    placeringsPlan: new PlaceringsPlan(null, "07:00", "16:00"),
    menu: new Menu([new Vare("Espresso",30,"kaffe"),new Vare("Cappuccino",42,"kaffe"),new Vare("Flat White",45,"kaffe"),new Vare("Croissant",28,"mad"),new Vare("Varm kakao",38,"varm drik")]),
    billedFarve: "#C8603A", status: "aktiv"
  }),
  new Kaffevogn({
    id: 2, navn: "Islands Brygge Brew",
    beskrivelse: "Kold brew og single origin ved havnefronten",
    placering: new Placering(new Koordinat(55.6631, 12.5773), "Islands Brygge 5, 2300 København S"),
    placeringsPlan: new PlaceringsPlan(null, "08:00", "18:00"),
    menu: new Menu([new Vare("Cold Brew",40,"kaffe"),new Vare("Latte",44,"kaffe"),new Vare("Matcha latte",48,"te"),new Vare("Banan brød",35,"mad")]),
    billedFarve: "#4A7C6F", status: "aktiv"
  }),
  new Kaffevogn({
    id: 3, navn: "Vesterbro Vågner",
    beskrivelse: "Aftenkopi og snacks på Istedgade",
    placering: new Placering(new Koordinat(55.6715, 12.5490), "Istedgade 45, 1650 København V"),
    placeringsPlan: new PlaceringsPlan(null, "18:00", "22:00"),
    menu: new Menu([new Vare("Americano",32,"kaffe"),new Vare("Cortado",38,"kaffe"),new Vare("Havregrød",45,"mad"),new Vare("Juice",35,"drikke")]),
    billedFarve: "#8B6914", status: "planlagt"
  }),
  new Kaffevogn({
    id: 4, navn: "Frederiksberg Frisk",
    beskrivelse: "Organisk kaffe og superfood smoothies",
    placering: new Placering(new Koordinat(55.6796, 12.5244), "Frederiksberg Allé 20, 1820 Frederiksberg"),
    placeringsPlan: new PlaceringsPlan(null, "09:00", "17:00"),
    menu: new Menu([new Vare("Pour Over",52,"kaffe"),new Vare("Smoothie",55,"drikke"),new Vare("Avocado toast",65,"mad")]),
    billedFarve: "#2D7A4F", status: "aktiv"
  }),
  new Kaffevogn({
    id: 5, navn: "Østerbro Espresso",
    beskrivelse: "Klassisk italiensk espressobar på hjul",
    placering: new Placering(new Koordinat(55.7050, 12.5763), "Trianglen, 2100 København Ø"),
    placeringsPlan: new PlaceringsPlan(null, "19:00", "23:00"),
    menu: new Menu([new Vare("Espresso",28,"kaffe"),new Vare("Macchiato",34,"kaffe"),new Vare("Cannoli",32,"mad"),new Vare("Americano",36,"kaffe")]),
    billedFarve: "#8B3A3A", status: "planlagt"
  }),
  new Kaffevogn({
    id: 6, navn: "Refshaleøen Roast",
    beskrivelse: "Håndristet kaffe på den kreative ø",
    placering: new Placering(new Koordinat(55.6938, 12.6142), "Refshalevej 167, 1432 København K"),
    placeringsPlan: new PlaceringsPlan(null, "10:00", "20:00"),
    menu: new Menu([new Vare("Filter kaffe",35,"kaffe"),new Vare("Nitro Cold Brew",55,"kaffe"),new Vare("Kanelbrud",30,"mad")]),
    billedFarve: "#5A3E2B", status: "aktiv"
  }),
  new Kaffevogn({
    id: 7, navn: "Søndre Frihavn Kop",
    beskrivelse: "Hyggelig vogn med udsigt til havnen",
    placering: new Placering(new Koordinat(55.6882, 12.5990), "Søndre Frihavn, 2100 København Ø"),
    menu: new Menu([new Vare("Latte",44,"kaffe"),new Vare("Te",28,"te")]),
    billedFarve: "#3A5F8A", status: "inaktiv"
  }),
];

export const mockBruger = new Kunde(1, "Frederik Hansen", "frederik@example.dk");
mockBruger.tilfoejFavorit(1);
mockBruger.tilfoejFavorit(4);

export const mockKortvisning = new Kortvisning(mockVogne);
