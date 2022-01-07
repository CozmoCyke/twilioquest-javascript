# Branchez votre code, ou sinon !

Le but de cet exercice est d'apprendre à utiliser une instruction [else](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals). Auparavant, vous avez utilisé une instruction [if](https://fr.javascript.info/ifelse#l-instruction-if) pour spécifier un bloc de code qui s'exécuterait si une certaine condition était remplie. L'instruction `else` vous permet de spécifier un code qui s'exécute dans tous les autres cas.

[Pour en savoir plus sur le fonctionnement d'une instruction if/else, consultez MDN](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals).

Voici un exemple rapide d'une instruction if comportant une clause `else` :

```js
const luckyNumber = 7 ;

if (luckyNumber === 7) {
  console.log('Oui, 7 est un chiffre porte-bonheur.') ;
} else {
  console.log('Je pense que seul 7 est un chiffre porte-bonheur, non ?') ;
}
```

Dans cet exemple, la deuxième chaîne de caractères est imprimée si `luckyNumber` est défini sur un autre nombre que `7`.

## Correction du détecteur de vie d'arbre

Pour étendre le pont, vous devez créer un fichier appelé `treeLifeDetector.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Vous aurez besoin de travailler avec un [argument de ligne de commande](https://nodejs.org/fr/knowledge/command-line/how-to-parse-command-line-arguments/) - un nombre à un chiffre qui spécifie si un arbre est vivant, ou dans un autre état.

Voici un code que vous pouvez utiliser comme point de départ, qui obtient la valeur du premier argument passé à votre script.

```js
// Ces lignes de code récupèrent l'argument de la ligne de commande
const argumentValue = process.argv[2] ;
const treeLifeStatus = Number(argumentValue) ;

// Écrivez ici votre instruction if ci-dessous !

```

Vous pouvez tester le code ci-dessus en l'exécutant comme ceci - ce qui suit devrait imprimer la chaîne `alive` :

```bash
node treeLifeDetector.js 0
```

Ceci devrait imprimer le texte `autre` :

```bash
node treeLifeDetector.js 3
```

Une fois que votre script fonctionne comme décrit dans l'objectif, cliquez sur *HACK* pour valider votre travail !

## Ressources utiles

* [MDN Intro aux conditionnels](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals)
* [JavaScript.info - Instruction Else](https://fr.javascript.info/ifelse)
* [MDN - Types de données JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures)
