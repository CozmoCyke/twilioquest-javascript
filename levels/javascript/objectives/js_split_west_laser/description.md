<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.beamTwoOnline &&
worldState.beamThreeOnline &&
worldState.beamFourOnline;
%>

# Activation du rayon final

<style>
table.lasers {
  margin-top: 10px;
}
table.lasers th, table.lasers td {
  text-align: center !important;
}
table.lasers td span {
  font-weight: bold;
}
table.lasers td span.on {
  color: green;
}
table.lasers td span.off {
  color: red;
}
</style>

<table class="lasers">
  <tr>
    <th>RAYON 1</th>
    <th>RAYON 2</th>
    <th>RAYON 3</th>
    <th>RAYON 4</th>
  </tr>
  <tr>
    <td>
      <% if (worldState.beamOneOnline) { %>
        <span class="on">ONLINE</span>
      <% } else { %>
        <span class="off">OFFLINE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamTwoOnline) { %>
        <span class="on">ONLINE</span>
      <% } else { %>
        <span class="off">OFFLINE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamThreeOnline) { %>
        <span class="on">ONLINE</span>
      <% } else { %>
        <span class="off">OFFLINE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamFourOnline) { %>
        <span class="on">ONLINE</span>
      <% } else { %>
        <span class="off">OFFLINE</span>
      <% } %>
    </td>
  </tr>
</table>

<div class="aside">
<h3>To-Do List</h3>
<% 
if (isObjectiveReady) {
%>
<ul>
  <li>Créer un fichier appelé <code>ducktypium.js</code></li>.
  <li>Créer une classe <code>Ducktypium</code> telle que décrite dans l'objectif, en utilisant toutes les compétences que vous avez apprises.</li>
  <li>Cliquez sur <em>HACK</em> une fois que vous avez terminé pour inverser l'expérience !</li>.
</ul>
<% } else { %>
<ul>
  <li>Trouver les trois scientifiques perdus dans le labo et obtenez leurs codes d'activation</li>.
  <li>Utiliser les codes d'activation pour activer les rayons 2, 3 et 4</li>.
  <li>Revenez ici pour activer le dernier rayon</li>.
</ul>
<% } %>
</div>

<%
if (isObjectiveReady) {
%>

Avec les trois autres rayons en ligne, vous avez maintenant la possibilité de **inverser l'expérience ratée** et de sauver la réalité telle que nous la connaissons !

Vous parcourez les commandes du rayon primaire pour analyser le problème de l'expérience précédente. Il semble que les calculs du scientifique principal étaient en effet corrects, et que tout aurait dû fonctionner comme prévu. L'explosion a en fait été causée par une autre erreur, qui **semble être un sabotage délibéré** Vous vous promettez de découvrir le coupable derrière ce sabotage, mais pour l'instant, vous ramenez votre attention à la tâche en cours.

Le fichier JavaScript saboté a été supprimé sans aucune sauvegarde que vous puissiez trouver. Vous devrez créer un remplacement pour cet utilitaire important. Le fichier en question décrit les propriétés du ducktypium et exécute un certain nombre de tâches liées au processus de stabilisation des cristaux.

## La classe Ducktypium

Dans votre dossier de code, créez un fichier nommé `ducktypium.js`. A l'intérieur de ce fichier, créez une classe appelée `Ducktypium`. Le constructeur doit prendre une seule chaîne en argument, une couleur de cristal, et stocker ces données dans une variable d'instance nommée `color`. La **couleur ne peut être que `red`, `blue`, ou `yellow`**. Le constructeur doit [lancer une erreur] (https://javascript.info/try-catch#throwing-our-own-errors) si l'argument est une autre chaîne de caractères.

Lorsque la classe est créée, elle doit **également définir une propriété** appelée `calibrationSequence` qui est initialement définie comme étant un **tableau vide**.

La classe Ducktypium doit implémenter deux méthodes d'instance : `refract` et `calibrate`. Chacune de ces fonctions sera décrite ci-dessous.

## La méthode `refract'.

Une des méthodes requises décrit les propriétés de réfraction du ducktypium lorsqu'il est exposé à une lumière colorée.

La méthode `refract` doit prendre un seul argument de type chaîne de caractères, qui doit être soit `rouge`, soit `blue`, soit `yellow`. La méthode doit [lancer une erreur](https://fr.javascript.info/try-catch#lever-nos-propres-exceptions) si l'argument est une autre chaîne, tout comme le constructeur. Cette fonction doit **renvoyer une seule chaîne**, qui est la couleur produite par la combinaison de la propriété `color` de l'instance et de la couleur passée à la fonction `refract`.

- Si la propriété `color` de l'instance est la même que l'argument passé, renvoyez cette valeur.
- Si la combinaison des couleurs est différente, il doit renvoyer une chaîne de caractères qui est la combinaison de ces deux [couleurs primaires](https://fr.wikipedia.org/wiki/Couleur_primaire).

Pour référence, les couleurs primaires se combinent de la manière suivante :

- <span style="color:red">red</span> + <span style="color:blue">blue</span> = <span style="color:purple">purple</span>.
- <span style="color:red">red</span> + <span style="color:#ad9400">yellow</span> = <span style="color:orange">orange</span>
- <span style="color:#ad9400">yellow</span> + <span style="color:blue">blue</span> = <span style="color:green">green</span>

## La méthode `calibrate`.

L'autre méthode requise crée une séquence de calibration nécessaire à la stabilisation d'un cristal de ducktypium.

La méthode `calibrate` prend un seul argument, un tableau de nombres. Avec ce tableau d'entrée, vous devez effectuer les opérations suivantes :

- Trier les nombres du plus petit au plus grand
- Multipliez chaque nombre du tableau par 3.
- Affectez le tableau résultant à la variable `calibrationSequence` de l'instance `Ducktypium`.

## Exemple d'utilisation

Une fois terminée, votre classe Ducktypium devrait se comporter comme dans l'exemple suivant.

```js
// L'exemple suivant produirait une erreur
try {
  const badColor = new Ducktypium("pink");
} catch (e) {
  console.log("Color must be red, yellow, or blue!");
}

// Créer une nouvelle instance de la classe
const dt = new Ducktypium("red");

console.log(dt.color); // affiche 'red'

console.log(dt.refract("blue")); // affiche 'purple'
console.log(dt.refract("red")); // affiche 'red'

dt.calibrate([3, 5, 1]);

console.log(dt.calibrationSequence); // affiche [3, 9, 15]
```

Des exemples de code que vous pouvez utiliser comme point de départ se trouvent dans l'onglet Aide. Cela nécessitera toutes vos compétences en JavaScript, mais vous pouvez y arriver ! Le destin du Cloud est entre vos mains.

Lorsque votre script `ducktypium.js` est prêt, cliquez sur le bouton _HACK_ pour inverser l'expérience !

<% } else { %>
Pour inverser l'expérience ratée ducktypium, vous devez **remettre en ligne les quatre rayons de stase**, y compris celui-ci (rayon 1). Les faisceaux 2, 3 et 4 doivent d'abord être remis en ligne avant que ce rayon puisse être activé.

La scientifique principale vous a dit que **ses collègues ont les codes d'activation** nécessaires pour redémarrer les trois autres lasers. Cherchez ces trois scientifiques dans le reste du labo et **utiliser leurs codes** pour redémarrer les autres lasers dans cette pièce.

Une fois que les trois autres rayons sont de nouveau en ligne, **Revenez ici pour activer le dernier rayon**.
<% } %>
