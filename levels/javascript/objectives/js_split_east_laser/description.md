<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.eastWing &&
worldState.eastWing.hadSavedConversation;
%>

# Activation du rayon 3

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
  <li>Créer un fichier appelé <code>laserPower.js</code></li>.
  <li>Créer une fonction appelée <code>calculerPuissance</code> qui prend un tableau de nombres comme seul argument.</li>
  <li>Votre fonction doit <b>renvoyer un nombre</b>. Ce nombre doit être le résultat de la transformation et de la combinaison du tableau d'entrée comme décrit dans l'objectif.</li>
  <li>Cliquez sur <em>HACK</em> lorsque vous avez terminé.</li>
</ul>
<% } else { %>
<ul>
  <li>Trouver et parler à l'ingénieur électricien dans l'aile est du labo</li>.
  <li>Retournez ici pour activer le rayon 3</li>.
</ul>
<% } %>
</div>

<% if (isObjectiveReady) { %>

Après avoir entré le code d'accès de l'ingénieur électricien, l'écran s'anime et vous commencez à dépanner les systèmes connectés au rayon 3.

Il semble que le rayon ait été mis hors ligne en raison d'une erreur dans le calcul de la puissance à envoyer par le rayon laser. Cette logique est régie par une fonction JavaScript que vous devrez réparer.

Vous devrez faire appel à tout ce que vous avez appris sur les tableaux pour relever ce défi.

## Redémarrage du rayon

Créez un fichier appelé `laserPower.js` dans votre dossier de code. Dans ce fichier, [créez une fonction JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions) nommée `calculatePower`.

Cette fonction doit prendre un argument - un tableau de nombres. Ce tableau contient les paramètres de puissance globale pour le laser, mais les nombres d'entrée sont légèrement décalés.

Votre fonction `calculatePower` doit d'abord ajuster toutes les valeurs du tableau d'entrée en les **multipliant par deux**. Ensuite, vous devez **additionner tous ces nombres ensemble**, et **renvoyer le résultat** de votre fonction.

Une fois que votre code est prêt, cliquez sur le bouton _HACK_ pour remettre ce laser en marche !

<% } else { %>

Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès de l'ingénieur électricien** afin d'activer ce laser.

L'ingénieur électricien est probablement à bord du cargo d'approvisionnement amarré dans l'aile Est du labo. Ils étaient en train de traiter une nouvelle cargaison de fournitures lorsque l'explosion a eu lieu.

**Parlez à l'ingénieur électrique pour recevoir le code d'accès pour ce rayon.

<% } %>
