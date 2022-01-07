<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.southWing &&
worldState.southWing.hadSavedConversation;
%>

# Activation du rayon 2

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
<h3>Liste de tâches à accomplir</h3>
<% 
if (isObjectiveReady) {
%>
<ul>
  <li>Créer un fichier appelé <code>sortOrder.js</code></li>.
  <li>Il doit prendre deux arguments en ligne de commande, que vous devez comparer</li>.
  <li>Votre script doit afficher <code>-1</code>, <code>0</code>, ou <code>1</code> comme décrit ci-dessous, en fonction de l'ordre alphabétique</li>.
</ul>
<% } else { %>
<ul>
  <li>Trouver et parler au botaniste dans l'aile sud du labo</li>.
  <li>Retournez ici pour activer le rayon 2</li>.
</ul>
<% } %>
</div>

<% if (isObjectiveReady) { %>

En utilisant le code d'activation du botaniste, vous accédez aux commandes de ce rayon de stase. Après avoir exécuté une routine de diagnostic rapide, vous voyez qu'il manque au laser une pièce essentielle de la fonctionnalité - un script qui **trie les chaînes de caractères par ordre alphabétique**.

Vous devrez réécrire ce script de tri afin de redémarrer le laser.

## Réussir à trier les choses

Dans votre dossier de code, créez un script appelé `sortOrder.js`. Ce script prendra **deux arguments en ligne de commande** - une paire de chaînes de caractères qui doivent être comparées pour voir laquelle arrive en premier dans l'ordre alphabétique (la casse des lettres n'est pas importante).

Pour tester votre script, vous devez l'exécuter comme suit :

```bash
node sortOrder.js cats dogs
```

Votre script doit déterminer si la première chaîne est avant, après ou dans la même position (égale) que la deuxième chaîne, par ordre alphabétique. Pour chaque cas, vous devez afficher un nombre avec `console.log` comme décrit ci-dessous.

- Lorsque le premier argument est **plus haut** dans l'alphabet que le second, votre script doit afficher `-1`.
- Lorsque le premier argument est **le même** que le second, votre script doit afficher `0`.
- Lorsque le premier argument est **plus bas** dans l'alphabet que le second, votre fonction doit afficher `1`.

Lorsque votre script implémente cette fonctionnalité de comparaison, cliquez sur le bouton _HACK_ pour relancer ce laser !

<% } else { %>

Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès du botaniste** afin d'activer ce laser.

Le botaniste est probablement dans l'aile sud du labo, où il a étudié les effets du ducktypium sur la vie végétale.

**Parler au botaniste** pour recevoir le code d'accès à ce rayon.

<% } %>
