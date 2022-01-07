# Apprendre l'instruction If

Le but de cet objectif est d'apprendre à exécuter du code de manière conditionnelle à l'aide d'une [instruction if](https://javascript.info/ifelse#the-if-statement). En programmation, vous voudrez souvent exécuter du code uniquement lorsque certaines conditions sont remplies, par exemple si un utilisateur est connecté ou si un fichier donné existe.

[Pour en savoir plus sur le fonctionnement d'une instruction if, consultez MDN](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals).

Voici un exemple rapide d'instruction if qui utilise l'opérateur de comparaison [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators.](l'opérateur `===`) pour vérifier si deux chaînes de texte sont identiques et afficher du texte si c'est le cas :

```js
const animal = 'Chien' ;

if (animal === 'Chien') {
  console.log('wo!') ;
}
```

Une instruction de comparaison donne une valeur [booléenne](https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures) `vrai` ou `faux`. Si l'instruction est vraie, le code contenu dans l'instruction if (les parties entre accolades `{` `}`) est exécuté.

## Construction de ponts

Pour étendre le pont, vous devez créer un fichier appelé `northBridgeControl.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Tout comme vous l'avez fait lorsque vous avez récupéré le mot de passe dans le bureau du scientifique principal, vous devrez travailler avec des [arguments de ligne de commande](https://nodejs.org/fr/knowledge/command-line/how-to-parse-command-line-arguments/). Votre code affichera un message spécifique si et seulement si un certain argument est passé.

Voici un code que vous pouvez utiliser comme point de départ, qui réussit à obtenir la valeur du premier argument passé dans votre script. Cependant, l'instruction if **ne fonctionnera pas** telle qu'elle est écrite actuellement. Vous devrez la modifier pour satisfaire l'objectif.

```js
const argumentValue = process.argv[2] ;

// Modifiez l'instruction if ci-dessous pour qu'elle s'exécute si et seulement si "argumentValue" est
// égale à la chaîne "EXTEND".
if (false) {
  console.log('Extending bridge!') ;
}
```

Vous pouvez tester le code ci-dessus en l'exécutant comme ceci - cela devrait afficher le message :

```bash
node northBridgeControl.js EXTEND
```

Ceci ne devrait rien afficher :

```bash
node northBridgeControl.js GO
```

Une fois que votre script fonctionne comme décrit dans l'objectif, cliquez sur *HACK* pour valider votre travail !

## Ressources utiles

* [MDN Intro to Conditionals](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals)
* [JavaScript.info - If Statement](https://fr.javascript.info/ifelse#l-instruction-if)
* [MDN - Types de données JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures)
