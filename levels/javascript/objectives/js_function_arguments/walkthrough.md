# Apprendre à écrire une fonction JavaScript

Le but de cet exercice est d'apprendre à [créer une fonction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) qui prend des **arguments** (également appelés "paramètres"). Un **argument** est un élément de données d'entrée que vos fonctions peuvent utiliser pour produire différentes sorties.

Créez un fichier appelé `politeLasers.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une fonction appelée `getLaserSetting`. Voici un code que vous pouvez utiliser comme point de départ - il a déjà la fonction définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
function getLaserSetting(magicWord) {
  if (magicWord === 'le mot magique ici') {
    return 'qu'est-ce que cela devrait être ?' ;
  } else {
    return 'ON' ;
  }
}

const currentSetting = getLaserSetting('right now!') ;
console.log('Le réglage actuel du laser est : ' + currentSetting) ;
```

Dans l'objectif, il est dit que votre fonction doit retourner la chaîne `OFF` lorsque le premier argument de la fonction (`magicWord` dans l'exemple ci-dessus) est la chaîne `please`. Elle doit renvoyer `ON` avec toute autre entrée.

Lorsque votre fonction fonctionne comme indiqué dans l'objectif, cliquez sur le bouton *HACK* pour valider votre travail.

## Liens utiles

* [JavaScript.info Guide des fonctions](https://fr.javascript.info/function-basics)
* [Déclaration de fonction](https://fr.javascript.info/function-basics#declaration-de-fonction)
* [Renvoyer des valeurs à partir de fonctions](https://fr.javascript.info/function-basics#renvoyer-une-valeur)
* [Guide des fonctions MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
