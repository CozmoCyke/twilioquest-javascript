<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.southWing &&
worldState.southWing.hadSavedConversation;
%>

# Redémarrage du laser

<% if (isObjectiveReady) { %>

AAprès avoir appris la logique conditionnelle dans l'aile sud, vous êtes prêt à relever ce défi ! Créez un fichier nommé `sortOrder.js` dans votre dossier de code, situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Utilisez le code suivant comme point de départ :

```js
const firstValue = process.argv[2];
const secondValue = process.argv[3];

// Votre code de comparaison (si déclarations) va ici
```

Votre code devra afficher l'un des trois nombres suivants, selon que la première valeur est antérieure, identique ou postérieure à la seconde dans l'ordre alphabétique. Si votre script était exécuté comme ceci :

```bash
node sortOrder.js cats dogs
```

Elle devrait afficher `-1`, puisque `cats` vient avant `dogs` par ordre alphabétique. Si elle était exécutée comme ceci :

```bash
node sortOrder.js cats CATS
```

Elle devrait afficher `0`, puisque les chaînes `cats` et `CATS` sont alphabétiquement équivalentes. Enfin, si elle était exécutée comme ceci :

```bash
node sortOrder.js dogs cats
```

Il devrait afficher `1`, puisque `dogs` vient après `cats` par ordre alphabétique.

Votre code devra [comparer les chaînes de caractères par ordre alphabétique, comme illustré ici](https://fr.javascript.info/comparison#comparaison-de-chaines-de-caracteres). De plus, vous devrez peut-être convertir les chaînes de caractères à la même casse avant la comparaison en utilisant [toLowerCase](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase).

Cette tâche devrait être très similaire à celle que vous avez dû accomplir dans l'aile sud du labo - retournez-y et faites référence à ce code si nécessaire.

Cliquez sur _HACK_ lorsque votre script se comporte comme décrit dans l'objectif. Vous pouvez le faire !

## Ressources utiles

- [MDN référence aux conditionnels](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals)
- [JavaScript.info - comparaison de chaînes](https://fr.javascript.info/comparison#comparaison-de-chaines-de-caracteres)


<% } else { %>

Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès du botaniste** afin d'activer ce laser.

Le botaniste est probablement dans l'**aile sud** du labo, où il a étudié l'effet du ducktypium sur la vie végétale.

**Parlez au botaniste** pour obtenir le code d'accès à ce rayon.

<% } %>
