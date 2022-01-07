// Voici à quoi devrait ressembler votre déclaration de variable dans votre fichier
// fichier séparé onOneCondition.js !

function sayHi(argument) {
  if (argument === true) {
    return 'Au revoir !';
  }
}

// Ce sont vos cas de test ! Vous n'avez pas besoin de les modifier !
//
// Ils appellent votre fonction avec différentes entrées et les affichent
// dans votre console lorsque vous exécutez ce fichier avec Node.js.
console.log(sayHi(true));
console.log(sayHi(false));
console.log(sayHi('une chaîne de caractères'));
