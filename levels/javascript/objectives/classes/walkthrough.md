# Classe élevée

Le but de cet exercice est de vous familiariser avec les [classes](https://fr.javascript.info/class) JavaScript. Les "classes" sont de nouveaux types d'objets que vous pouvez créer dans votre propre code. 

La plupart de vos travaux dans le labo JavaScript ont utilisé des objets intégrés et des types de données "primitifs" comme les nombres, les chaînes de caractères et les booléens. Les classes représentent des concepts de données plus complexes spécifiques à votre code, comme les utilisateurs, les articles de blog, les préférences ou les abonnements, par exemple. Contrairement aux [littéraux d'objet](https://fr.javascript.info/object#litteraux-et-proprietes), les classes peuvent également avoir des comportements qui agissent sur leurs données.

Dans cet exercice, vous devez [créer une classe](https://fr.javascript.info/class) sur la base des spécifications de l'objectif.

Créez un fichier appelé `classes.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une classe appelée `Materializer`. Voici un peu de code que vous pouvez utiliser comme point de départ - il a déjà la classe définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
class Materializer {
  constructor(targetName) {
    // votre code est ici
  }

  // votre code est ici
}

// Les lignes de code suivantes ne sont pas nécessaires pour la solution, mais vous pouvez les utiliser pour tester votre solution.
// être utilisées par vous pour tester vot
const m = new Materializer('Kevin') ;
console.log(m.acti) ; // afficherait "false".

m.activate() ;
console.log(m.activate) ; // afficherait "true" (vrai)

console.log(m.materialize()) ; // afficherait "Kevin".
```

Lorsque votre fonction fonctionne comme indiqué dans l'objectif, cliquez sur le bouton *HACK* pour valider votre travail.

## Liens utiles

* [JavaScript.info - Classes](https://fr.javascript.info/class)
* [MDN - Classes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)
