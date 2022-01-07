<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.northWing &&
worldState.northWing.hadSavedConversation;
%>

# Aide pour les objectifs

<% if (isObjectiveReady) { %>

Dans cet objectif, vous devrez combiner ce que vous avez appris sur les objets et les classes dans l'aile nord du laboratoire pour créer une solution.

Dans cet exercice, vous devez [créer une classe](https://javascript.info/class) sur la base de la spécification de l'objectif.

Créez un fichier appelé `targetingSolution.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une classe appelée `TargetingSolution`. Voici un code que vous pouvez utiliser comme point de départ - il a déjà la classe définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
class TargetingSolution {
  constructor(config) {
    // votre code est ici
  }

  // votre code est ici
}

// Les lignes de code suivantes ne sont pas nécessaires pour la solution, mais peuvent être
// utilisées par vous pour tester votre solution.
const m = new TargetingSolution({
  x: 10,
  y: 15,
  z: 900,
});

console.log(m.target()); // afficherait "(10, 15, 900)"
```

Worsque votre fonction fonctionne comme indiqué dans l'objectif, cliquez sur le bouton _HACK_ pour valider votre travail. Vous pouvez le réussir !

## Liens utiles

- [JavaScript.info - Classes](https://javascript.info/class)
- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JavaScript.info - Object literal notation](https://javascript.info/object#literals-and-properties)
- [MDN - Object Initialization](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

<% } else { %>

YVous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès du physicien théoricien** afin d'activer ce laser.

Le physicien théoricien se trouve probablement dans l'aile nord du laboratoire, où il a étudié la capacité du ducktypium à courber l'espace-temps et à manipuler la matière.

**Parlez au physicien théoricien pour recevoir le code d'accès pour ce rayon.Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès du physicien théoricien** afin d'activer ce laser.

Le physicien théoricien se trouve probablement dans l'aile nord du laboratoire, où il a étudié la capacité du ducktypium à courber l'espace-temps et à manipuler la matière.

**Parlez au physicien théoricien** pour recevoir le code d'accès pour ce rayon.

<% } %>
