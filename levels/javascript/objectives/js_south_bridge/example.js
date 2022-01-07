// Voici à quoi devrait ressembler votre déclaration de variable dans votre fichier
// fichier séparé shouldWater.js !

const MILLISECONDES_DANS_UNE_SECONDE = 1000;
const SECONDES_DANS_UNE_MINUTE = 60;
const MINUTES_DANS_UNE_HEURE = 60;
const MILLISECONDES_DANS_UNE_HEURE =
  MILLISECONDES_DANS_UNE_SECONDE * SECONDES_DANS_UNE_MINUTE * MINUTES_DANS_UNE_HEURE;

function shouldWater(treeType, lastWatered) {
  const currentTime = Date.now();

  // arbre vivant, arroser toutes les 8 heures

  // arbre mort, ne jamais arroser

  // arbre fruitier, arroser toutes les 8 heures

  // arbre d'automne, arroser toutes les 8 heures

  return false;
}

// Ce sont vos cas de test ! Vous n'avez pas besoin de les modifier !
//
// Ils appellent votre fonction avec différentes entrées et les affichent
// dans votre console lorsque vous exécutez ce fichier avec Node.js.
console.log(shouldWater(0, Date.now()));
console.log(shouldWater(0, Date.now() - 8 * MILLISECONDES_DANS_UNE_HEURE - 1));
console.log(shouldWater(0, Date.now() - 8 * MILLISECONDES_DANS_UNE_HEURE));
console.log(shouldWater(1, Date.now() - 24 * MILLISECONDES_DANS_UNE_HEURE));
