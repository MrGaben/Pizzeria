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