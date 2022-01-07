# Apprendre à écrire une fonction en JavaScript

Le but de cet exercice est d'apprendre à [créer une fonction] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) en JavaScript. Une **fonction** est un morceau de code réutilisable que vous pouvez **appeler** encore et encore pour effectuer une tâche spécifique.

Dans la plupart des exemples que vous avez vus jusqu'à présent, vous avez peut-être remarqué que nous utilisons une fonction intégrée à JavaScript appelée `console.log`. Le rôle de cette fonction est d'afficher une chaîne de texte dans la fenêtre du terminal. Pour franchir cette barrière, vous devrez créer votre propre fonction.

Créez un fichier appelé `laserFunction.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une fonction appelée `getLaserSetting`. Voici un code que vous pouvez utiliser comme point de départ - la fonction est déjà définie, mais elle renvoie actuellement la mauvaise valeur :

```js
function getLaserSetting() {
  const setting = 42 ; // <- Vous devrez modifier cette ligne de code !
  renvoyer le paramètre ;
}

const currentSetting = getLaserSetting() ;
console.log('Le réglage actuel du laser est : ' + currentSetting) ;
```
Vous devrez modifier le contenu de la fonction déclarée ci-dessus pour remplir cet objectif.  Les accolades ouvertes et fermées (les caractères `{` et `}`) indiquent le début et la fin du code à l'intérieur de la fonction. Seul le code écrit entre les caractères `{` et `}` sera exécuté comme faisant partie de votre fonction !

Votre fonction doit **renvoyer** la valeur correcte pour le réglage du laser, comme décrit dans l'objectif. Utilisez ce que vous avez appris sur les variables pour avoir créé le changement nécessaire. Lorsque votre fonction fonctionne comme indiqué dans l'onglet objectif, cliquez sur le bouton *HACK* pour valider votre travail.

## Liens utiles

* [JavaScript.info Guide des fonctions](https://fr.javascript.info/function-basics)
* [Déclaration des fonctions](https://fr.javascript.info/function-basics#declaration-de-fonction)
* [Renvoyer des valeurs à partir de fonctions](https://fr.javascript.info/function-basics#renvoyer-une-valeur)
* [Guide des fonctions MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
