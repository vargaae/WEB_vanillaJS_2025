var Januar = new Array();

// 1. Feltöltés
function feltoltJanuar(tomb, min, max) {
  for (let i = 0; i < 31; i++) {
    tomb[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// 2. Értékek kiiratása (Kiválogatás tétele – értékek kiírása nem tipikus kiválogatás, de formailag megfelel)
function kiirHomersekletek(tomb) {
  for (let i = 0; i < tomb.length; i++) {
    console.log(`Január ${i + 1}. -–- ${tomb[i]} Celsius fok`);
  }
}

// 3. Összegzés tétele
function atlagHomerseklet(tomb) {
  let osszeg = 0;
  for (let i = 0; i < tomb.length; i++) {
    osszeg += tomb[i];
  }
  let atlag = osszeg / tomb.length;
  console.log(`A januári középhőmérséklet: ${atlag.toFixed(1)} Celsius fok.`);
}

// 4. Eldöntés tétele
function voltFagymentesNap(tomb) {
  let i = 0;
  let fagymentes = false;

  while (i < tomb.length && tomb[i] <= 0) {
    i++;
  }
  if (i < tomb.length) {
    console.log("Volt fagymentes nap.");
    fagymentes = true;
  } else {
    console.log("Nem volt fagymentes nap.");
  }
  return fagymentes;
}

// 5. v1: Keresés tétele
function elsoFagymentesNap(tomb) {
  let i = 0;
  let fagymentesNapIndex = 0;
  while (i < tomb.length && tomb[i] < 0) {
    i++;
    if (i < tomb.length) {
      fagymentesNapIndex = i;
    } else {
      fagymentesNapIndex = -1;
    }
  }
  return fagymentesNapIndex;
}

// 5. v3: Eldöntés + Kiválasztás tétele
// (5. v4: Kiválasztás tétele - magában nem jó megoldás, mert nem biztos, hogy van fagymentes nap, igy jobb megoldás a Keresés)
function elsoFagymentesNapEldontesKivalasztas(tomb) {
  let i = 0;
  while (tomb[i] < 0) {
    i++;
  }
  return `Első fagymentes nap: Január ${i + 1}.`;
}

// 6. Megszámlálás tétele
function hanyFagymentesNapVolt(tomb) {
  let fagymentesNapokSzama = 0;
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i] > 0) {
      fagymentesNapokSzama++;
    }
  }
  return fagymentesNapokSzama;
}

// 7. Minimum és maximum kiválasztás tétele
function extremNapok(tomb) {
  let leghidegebbNap = 0;
  let legmelegebbNap = 0;
  for (let i = 0; i < tomb.length; i++) {
    if (tomb[i] < leghidegebbNap) {
      leghidegebbNap = i;
    }
    if (tomb[i] > legmelegebbNap) {
      legmelegebbNap = i;
    }
  }
  return `Leghidegebb nap: Január ${leghidegebbNap + 1}. - ${
    tomb[leghidegebbNap]
  } Celsius fok,\nLegmelegebb nap: Január ${legmelegebbNap + 1}. - ${
    tomb[legmelegebbNap]
  } Celsius fok`;
}

console.log("1.");
feltoltJanuar(Januar, -10, 3);
console.log("\n2.");
kiirHomersekletek(Januar);
console.log("\n3.");
atlagHomerseklet(Januar);
console.log("\n4.");
voltFagymentesNap(Januar);
console.log("\n5. Keresés");
console.log(
  elsoFagymentesNap(Januar) != -1
    ? `Első fagymentes nap: Január ${elsoFagymentesNap(Januar) + 1}.`
    : "Nem volt fagymentes nap."
);
// v3 megoldás: ternary operatorral megnézem az Eldöntés tétele alapján, hogy volt -e fagymentes nap
// -> majd ha igaz, akkor megy tovább a Kiválasztás tételére, mert alap esetben nem biztos, hogy volt -e ilyen érték
console.log("\n/ 4.+5.V3:Eldöntés:Ha volt=>Kiválasztás:");
console.log(
  voltFagymentesNap(Januar)
    ? elsoFagymentesNapEldontesKivalasztas(Januar)
    : "Nem volt fagymentes nap."
);
console.log("\n6.");
console.log(
  hanyFagymentesNapVolt(Januar) > 0
    ? `Fagymentes napok száma: ${hanyFagymentesNapVolt(Januar)}`
    : "Nem volt fagymentes nap."
);
console.log("\n7.");
console.log(extremNapok(Januar));
