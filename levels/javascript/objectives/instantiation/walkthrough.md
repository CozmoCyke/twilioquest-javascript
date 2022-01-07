# Des Objets plus complexes

L'objectif de cet exercice est de vous familiariser avec la [notation littérale des objets](https://fr.javascript.info/object#litteraux-et-proprietes) JavaScript.

La plupart de vos travaux dans le labo JavaScript ont utilisé des objets prédéfinis et des types de données "primitifs" comme les nombres, les chaînes de caractères et les booléens. Parfois, votre code doit pouvoir représenter des concepts de données plus complexes spécifiques à votre code, comme les utilisateurs, les articles de blog, les préférences ou les abonnements, par exemple.

Dans cet exercice, vous découvrirez un outil à votre disposition pour créer des données plus complexes : un [objet littéral](https://fr.javascript.info/object#litteraux-et-proprietes). Un objet que vous créez de cette manière peut avoir ses propres propriétés et peut être affecté à une seule variable.

Créez un fichier appelé `construction.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une fonction appelée `construct`. Voici un code que vous pouvez utiliser comme point de départ - il a déjà la fonction définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
function construct(name) {
  let person = {} ;

  return person ;
}

// Les lignes de code suivantes ne sont pas nécessaires à la solution, mais vous pouvez les utiliser pour tester votre solution.
// être utilisées par vous pour tester votre solution.
const somePerson = construct('Kevin') ;
console.log('name is : ' + somePerson.name) ; // ça devrait donner "Kevin".
console.log('la durée est : ' + somePerson.duration) ; // ça devrait donner 1000
```

Lorsque votre fonction fonctionne comme indiqué dans l'objectif, cliquez sur le bouton *HACK* pour valider votre travail.

## Liens utiles

* [JavaScript.info - notation littérale des objets](https://fr.javascript.info/object#litteraux-et-proprietes)
* [MDN - Initialisation d'objet](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Object_initializer)
* [JavaScript.info - Retourner les valeurs des fonctions]https://fr.javascript.info/function-basics#renvoyer-une-valeur)
* [MDN - Guide des fonctions](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions)
