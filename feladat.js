class Etel {
    constructor(nev, kaloriaSzam) {
      this.nev = nev;
      this._kaloriaSzam = kaloriaSzam;
      this._fogyaszthato = true;
    }
  
    get kaloriaSzam() {
      return this._kaloriaSzam;
    }
  
    set kaloriaSzam(ertek) {
      if (ertek < 0) {
        this._kaloriaSzam = 0;
      } else {
        this._kaloriaSzam = ertek;
      }
    }
  
    get fogyaszthato() {
      return this._fogyaszthato;
    }
  
    set fogyaszthato(ertek) {
      if (typeof ertek === "boolean") {
        this._fogyaszthato = ertek;
      } else {
        this._fogyaszthato = false;
      }
    }
  
    info() {
      const fogyaszthato_szoveg = this.fogyaszthato ? "igen" : "nem";
      return `${this.nev} (${this.kaloriaSzam} kaloria), fogyaszthato: ${fogyaszthato_szoveg}`;
    }
  }
