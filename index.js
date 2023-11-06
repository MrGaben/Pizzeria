document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const pizzaOrderForm = document.getElementById("pizza-order-form");
    const orderHistory = document.getElementById("order-history");

    let currentCustomer = null;
    const customers = [];

    // Betöltjük a rendeléseket a böngésző helyi tárolásából
    if (localStorage.getItem('rendelesek')) {
        customers.push(JSON.parse(localStorage.getItem('rendelesek')));
    }

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const money = parseFloat(document.getElementById("money").value);

        document.cookie = `name=${name}; expires=3600`;
        document.cookie = `money=${money}; expires=3600`;
        currentCustomer = customers.find(customer => customer.nev === name);

        if (!currentCustomer) {
            currentCustomer = new Vasarlo(name, money);
            customers.push(currentCustomer);
        }

        registrationForm.reset();

        // Mentjük a rendeléseket a böngésző helyi tárolásába
        localStorage.setItem('rendelesek', JSON.stringify(customers));

        displayOrderHistory();
    });

    pizzaOrderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!currentCustomer) {
            console.error("HIBA! Vásárló nincs bejelentkezve.");
            return;
        }

        const pizzaType = document.getElementById("pizza-type").value;
        const quantity = parseInt(document.getElementById("quantity").value);

        const pizza = new Pizza(pizzaType, 800 * quantity, quantity * 1500);

        currentCustomer.pizzatRendel(pizza, quantity);

        pizzaOrderForm.reset();

        // Mentjük a rendeléseket a böngésző helyi tárolásába
        localStorage.setItem('rendelesek', JSON.stringify(customers));

        displayOrderHistory();
    });

    function displayOrderHistory() {
        if (currentCustomer) {
            orderHistory.innerHTML = `<p>${currentCustomer.nev} rendelése: ${currentCustomer.pizzakatListaz()}</p>`;
        } else {
            orderHistory.innerHTML = "Nincs rendelési előzmény.";
        }
    }
});


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
    pizzatRendel(pizza, quantity) {
        if (!(typeof pizza === 'object') || !(pizza instanceof Pizza)) {
            console.error("HIBA! Nem pizza!");
            return;
        }
        if (this.penz < pizza.ar * quantity) {
            console.error("HIBA! Nincs eleg penz!");
            return;
        }
        if (!pizza.fogyaszthato) {
            console.error("HIBA! Nem eheto pizza!");
            return;
        }
        this.penz -= pizza.ar * quantity;
        for (let i = 0; i < quantity; i++) {
            this.rendelesek.push(pizza.nev);
        }
        console.log(`Sikeres rendeles: ${quantity} darab ${pizza.nev}`);
    }

    pizzakatListaz() {
        const name = document.getElementById("name").value;
        if (this.rendelesek.length === 0) {
            return "Nincs rendelés!";
        }
        let dbszam = {};
        let obj = {"name": name, "mennyiség": quantity}
        this.rendelesek.forEach(rendeles => {
            if (dbszam.hasOwnProperty(rendeles)) {
                dbszam[rendeles] += 1;
                localStorage.setItem('D:\Héja Gábor\Webpr,Projekt\pizza\renedelesek.json', JSON.stringify(obj));
            } else {
                dbszam[rendeles] = 1;
            }
        });
        let eredmeny = "";
        for (const [key, value] of Object.entries(dbszam)) {
            eredmeny += `${value} darab ${key}, `;
        }
        return eredmeny.substring(0, eredmeny.length - 2);
    }
    // ...
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