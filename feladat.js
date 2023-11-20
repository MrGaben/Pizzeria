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
  class Vasarlo{
    constructor(nev, penz){
        this.nev = nev;
        this.penz = penz;
        this.rendelesek = [];
    }
    pizzatRendel(pizza){
        if (!(typeof pizza === 'object') || !(pizza.hasOwnProperty('nev')) ||
        !(pizza.hasOwnProperty('kaloriaSzam') || !(pizza.hasOwnProperty('ar')) ||
        !(pizza.hasOwnProperty('feltetek')))){
            console.error("HIBA! Nem pizza!");
            return;
        }
        if(this.penz < pizza.ar){
            console.error("HIBA! Nincs eleg penz!");
            return;
        }
        if(pizza.fogyaszthato === false){
            console.error("HIBA! Nem eheto pizza!");
            return;
        }
        this.penz -= pizza.ar;
        this.rendelesek.push(pizza.nev);
        console.log("Sikeres rendeles!");
    }
   pizzakatListaz(){
    if(this.rendelesek.length === 0){
        return "Nincs rendeles!";
    }
    let dbszam = {};
    this.rendelesek.forEach(rendeles => {
       if(dbszam.hasOwnProperty(rendeles)){
        dbszam[rendeles] += 1;
       }
       else dbszam[rendeles] = 1;
    });
    let eredmeny = "";
    for(const [key,value] of Object.entries(dbszam)){
        eredmeny += `${value} darab ${key}, `;
    }
    return eredmeny.substring(0,eredmeny.length - 2);
   }
}
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