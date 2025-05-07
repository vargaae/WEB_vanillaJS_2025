// Készíts egy programot, amely a számára megadott területekről ismert magasságértékeket vizsgálja.
// Ha egy terület ismert magassága 200 méter alatt van, síkságról beszélünk, ha 200 és 500 méter
// között akkor dombságról, ha 500 méter felett akkor hegységről.
// 1. Készíts egy 20 adat tárolására alkalmas Terulet nevű tömböt.

let Terulet = new Array();

function TeruletRandom(array, min, max) {
  for (let i = 0; i < 20; i++) {
    array[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function TeruletKiir(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`- ${i + 1}. terület magassága: ${Terulet[i]} méter.`);
  }
}

// Összegzés tétele
function SiksagAtlag(array) {
  let osszeg = 0;
  siksagDarab = 0;
  atlag = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] < 200) {
      osszeg = +array[i];
      siksagDarab++;
    }
  }
  atlag = osszeg / siksagDarab;

  return `A síkságok átlagmagassága: ${
    osszeg != 0 ? atlag : 0
  } méter. (Számítás: Összegzett magasság: ${osszeg} m / ${siksagDarab} db síkság)`;
}

// Megszámlálás tétele
function HegyDarab(array) {
  let megszamlalas = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 500) {
      megszamlalas++;
    }
  }
  return megszamlalas;
}
// Minimum kiválasztás tétele
function DombMin(array) {
  let min = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[min] && array[i] < 500) {
      min = i;
    }
  }
  return min;
}
// Maximum kiválasztás tétele
function HegyMax(array) {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 500 && array[i] > array[max]) {
      max = i;
    }
  }
  return max;
}

// Eldöntés tétele
function HegyEldont(array) {
  let vanEEzerotszazMagas = false;
  let i = 0;
  while (i < array.length && array[i] < 1500) {
    i++;
  }
  i < array.length
    ? (vanEEzerotszazMagas = true)
    : (vanEEzerotszazMagas = false);
  return vanEEzerotszazMagas;
}

// Kiválogatás tétele stringgé alakított return-nel megoldva
function Top1500(array) {
  let newArrayString = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 1500) {
      newArrayString += `${i + 1}. terület ${array[i]} méter; `;
    }
  }
  if (newArrayString.endsWith("; ")) {
    newArrayString = newArrayString.slice(0, -2);
    newArrayString += ".";
  }
  return newArrayString;
}

function Top1500UjTombbel(array, newArray) {
  let szamlalo = 0;
  let newArrayString = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 1500) {
      newArray[szamlalo] = array[i];
      newArrayString += `${i + 1}. terület ${array[i]} méter; `;
      szamlalo++;
    }
  }
  if (newArrayString.endsWith("; ")) {
    newArrayString = newArrayString.slice(0, -2);
    newArrayString += ".";
  }
  console.log(newArrayString);
}

// 1.
console.log("1. Terület tömb létrehozva!");
// 2. Készíts egy TeruletRandom eljárást, amely 100 és 2000 közötti randomszámokkal feltölti a
// Terulet tömböt.
TeruletRandom(Terulet, 100, 2000);
console.log("\n2. Terület tömb feltöltve!");
// 3. Készíts egy TeruletKiir eljárást, amely kiírja a Terulet tömb elemeit. A kiíratás az alábbi formában
// történjen:
console.log("\n3. Terület tömb kilistázása:");
TeruletKiir(Terulet);
// 4. Készíts egy SiksagAtlag eljárást, amely megadja a síksági területek átlagmagasságát.
console.log("\n4.", SiksagAtlag(Terulet));
// 5. Készíts egy HegyDarab eljárást, amely megadja, hogy a vizsgált területek közül hány darab hegy van. Pl.:13 hegy van.
console.log("\n5.", `${HegyDarab(Terulet)} hegy van.`);
// 6. Készíts egy DombMin eljárást, amely megadja a legalacsonyabb dombsági terület magasságértékét. Pl.: A legalacsonyabb domb 320 méter magas.
console.log("\n6.", `A legalacsonyabb domb ${DombMin(Terulet)} méter magas.`);
// 7. Készíts egy HegyMax eljárást, amely megadja a legmagasabb hegységi terület magasságértékét.
console.log(
  "\n7.",
  `A vizsgált területek közül a legmagasabb ${
    Terulet[HegyMax(Terulet)]
  } méter magas.`
);

// 8. Készíts egy HegyEldont eljárást, amely választ ad arra a kérdésre, hogy van-e 1500 méternél
// magasabb hegy a vizsgált területek között.
console.log(
  `\n8. ${
    HegyEldont(Terulet)
      ? `Igen, van 1500 méternél magasabb.`
      : `Nem, nincs 1500 méternél magasabb.`
  }`
);

// 9. Készíts egy Top1500 eljárást, amely megadja az 1500 méternél magasabb területeket. Az eljárás
// írja ki, hogy hányadik a vizsgált terület és milyen magas. A területek adatait egymás mellé, egy
// sorba írd, pontosvesszővel elválasztva. Ha szükségesnek érzed, felhasználhatsz egy általad
// definiált új tömböt is a megoldáshoz.
let Top1500UjTomb = new Array();

if (HegyEldont(Terulet)) {
  console.log(`\n9. 1500 méternél magasabb területek: ${Top1500(Terulet)}`);
}

if (HegyEldont(Terulet)) {
  console.log(
    `\n------------------------ +Teszt: Új Tömb létrehozással és kiiratással -----------------------------------\n\n8-9. Igen, van 1500 méternél magasabb:`
  );
  Top1500UjTombbel(Terulet, Top1500UjTomb);
  console.log(
    `\n---------------------------------------------------------------------------------------------------------`
  );
}
