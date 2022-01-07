<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.eastWing &&
worldState.eastWing.hadSavedConversation;
%>

# Objective Help

<% if (isObjectiveReady) { %>

Pour réaliser cet objectif, vous devrez combiner plusieurs techniques que vous avez apprises en sauvant l'ingénieur électricien de la **boucle infinie**.

Créez un fichier appelé `laserPower.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une fonction appelée `calculatePower`. Voici un code que vous pouvez utiliser comme point de départ - il a déjà la fonction définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
function calculatePower(powerSettings) {
  let totalPower = 0;

  return totalPower;
}

// Les lignes de code suivantes ne sont pas nécessaires pour la solution, mais peuvent être
// utilisées par vous pour tester votre solution.
const laserPower = calculatePower([1, 3, 8]);
console.log("La puissance laser requise est " + laserPower); // devrait être 24
```

Toutes les compétences dont vous avez besoin pour surmonter ce défi ont été nécessaires pour parvenir à ce stade. Vous pouvez le faire !

Une fois que votre fonction `calculatePower` fonctionne comme décrit dans l'objectif, cliquez sur le bouton _HACK_.

## Liens utiles

- [JavaScript.info - Fonction reduce](https://fr.javascript.info/array-methods#reduce-reduceright)
- [JavaScript.info - Fonction Array map](https://fr.javascript.info/array-methods#map)
- [JavaScript.info - Instructions if](https://fr.javascript.info/ifelse)
- [JavaScript.info - Renvoyer des valeurs à partir de fonctions](https://fr.javascript.info/function-basics#renvoyer-une-valeur)
- [MDN - Guide des fonctions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

<% } else { %>

Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès de l'ingénieur électricien** afin d'activer ce laser.

L'ingénieur électricien est probablement à bord du cargo d'approvisionnement amarré dans l'aile Est du labo. Ils étaient en train de traiter une nouvelle cargaison de fournitures lorsque l'explosion a eu lieu.

**Parlez à l'ingénieur électricien** pour recevoir le code d'accès pour ce rayon.

<% } %>
