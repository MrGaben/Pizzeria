class Pizza extends Etel {
    constructor(nev, kaloriaSzam, ar = 1500) {
      if (!nev.endsWith("pizza")) {
        nev += " pizza";
      }
      super(nev, kaloriaSzam);
      this._ar = ar;
      this.feltetek = [];
    }
  
    get ar() {
      return this._ar;
    }
  
    set ar(ertek) {
      if (ertek < 0) {
        this._ar = 1000;
      } else {
        this._ar = ertek;
      }
    }
  
    megromlik() {
      this.fogyaszthato = false;
      console.log("A pizza megromlott.");
    }
  
    feltetetFelvesz(feltet) {
      if (typeof feltet === "object" && "nev" in feltet && "kaloria" in feltet) {
        if (typeof feltet.nev === "string" && typeof feltet.kaloria === "number") {
          if (!this.feltetek.some((f) => f.nev === feltet.nev)) {
            this.feltetek.push({ nev: feltet.nev, kaloria: feltet.kaloria });
            this.kaloriaSzam += feltet.kaloria;
            this.ar += 100;
            console.log("Feltet felvetel sikeres!");
          } else {
            console.log("HIBA! Mar van ilyen feltet!");
          }
        } else {
          console.log("HIBA! Nem megfelelo tipus!");
        }
      } else {
        console.log("HIBA! Nem egy feltet!");
      }
    }
  
    info() {
      const feltetSorozat =
        this.feltetek.length > 0
          ? this.feltetek.map((feltet) => feltet.nev).join(", ")
          : "";
      return `${this.nev} (${this.kaloriaSzam} kaloria), fogyaszthato: ${
        this.fogyaszthato ? "igen" : "nem"
      }, ar: ${this.ar} forint, feltetek: ${feltetSorozat}`;
    }
  }