<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.beamTwoOnline &&
worldState.beamThreeOnline &&
worldState.beamFourOnline;
%>

# Aide aux objectifs

<%
if (isObjectiveReady) {
%>

Cette tâche nécessitera tout ce que vous avez appris sur JavaScript jusqu'à présent ! Les classes, les méthodes de tableau et la logique booléenne seront toutes nécessaires.

Créez un fichier appelé `ducktypium.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Dans ce fichier, vous devez créer une classe appelée `Ducktypium`. Voici un code que vous pouvez utiliser comme point de départ - il a déjà la classe définie, mais ne fonctionne pas encore comme décrit dans l'objectif :

```js
class Ducktypium {
  constructor(color) {
    //votre code est ici
  }

  // votre code est ici
}

// Les lignes de code suivantes ne sont pas nécessaires pour la solution, mais peuvent être
// utilisées par vous pour tester votre solution.
const dt = new Ducktypium("red");

console.log(dt.color); // affiche 'red'

console.log(dt.refract("blue")); // affiche 'purple'
console.log(dt.refract("red")); // affiche 'red'

dt.calibrate([3, 5, 1]);

console.log(dt.calibrationSequence); // affiche [3, 9, 15]
```

N'oubliez pas que vous pouvez revenir dans les autres ailes du labo pour mettre en pratique toutes les compétences que vous avez acquises auparavant.

Une fois que vous avez implémenté la classe `Ducktypium` comme décrit dans l'objectif, cliquez sur _HACK_ et inversez l'expérience ! Vous avez réussi !

## Liens utiles

- [JavaScript.info - Référence complète](https://fr.javascript.info/)
- [Référence JavaScript MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Introduction)

<% } else { %>
Vous ne pourrez pas terminer cet objectif tant que vous n'aurez pas :

1. Trouver les trois scientifiques perdus
1. Utiliser leurs codes d'activation pour activer les trois autres rayons de cette salle.

Explorez le reste du labo - vous pouvez trouver un scientifique dans chacune des zones situées au sud, à l'est et à l'ouest de la salle d'expérience principale (celle où vous vous trouvez en ce moment).

Une fois que les trois autres rayons sont de nouveau en ligne, **Revenez ici pour activer le dernier rayon**.
<% } %>
