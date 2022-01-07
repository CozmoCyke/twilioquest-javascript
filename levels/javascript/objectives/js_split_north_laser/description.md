<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
const isObjectiveReady = worldState.northWing &&
worldState.northWing.hadSavedConversation;
%>

# Activer le rayon 4

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
        <span class="on">EN LIGNE</span>
      <% } else { %>
        <span class="off">HORS LIGNE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamTwoOnline) { %>
        <span class="on">EN LIGNE</span>
      <% } else { %>
        <span class="off">HORS-LIGNE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamThreeOnline) { %>
        <span class="on">EN LIGNE</span>
      <% } else { %>
        <span class="off">HORS LIGNE</span>
      <% } %>
    </td>
    <td>
      <% if (worldState.beamFourOnline) { %>
        <span class="on">EN LIGNE</span>
      <% } else { %>
        <span class="off">HORS LIGNE</span>
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
  <li>Créez un fichier nommé <code>targetingSolution.js</code></li>
  <li>Créez une classe nommée<code>TargetingSolution</code> en utilisant la spécification de cet objectif</li>
</ul>
<% } else { %>
<ul>
  <li>Trouvez et parlez au physicien théoricien, qui est piégé dans l'aile nord du labo.</li>
  <li>Revenez ici pour activer le rayon 4</li>
</ul>
<% } %>
</div>

<% if (isObjectiveReady) { %>

Après avoir entré le mot de passe du physicien, l'écran s'active et vous commencez à dépanner les systèmes connectés au rayon 4.

Il semble que les systèmes de ciblage de ce rayon ont été endommagés pendant l'accident. Pour redémarrer ce rayon, vous devrez implémenter un nouveau mécanisme de ciblage pour le laser en utilisant les [classes JavaScript](https://fr.javascript.info/class) et l'[objet litéral](https://fr.javascript.info/object#litteraux-et-proprietes).

## Redémarrage du rayon

Créez un fichier appelé `targetingSolution.js` dans votre dossier de code. Dans ce fichier, [créer une classe JavaScript](https://javascript.info/class) appelée `TargetingSolution`. Cette classe stockera les informations de ciblage pour le laser, et fournira une chaîne formatée contenant les coordonnées de la cible.

Le constructeur de cette classe doit prendre un argument - un objet littéral contenant les coordonnées précises x, y et z de la cible dans l'espace 3D du labo.

Le constructeur de votre `TargetingSolution` doit stocker les trois propriétés suivantes comme variables d'instance de l'objet de configuration.

| propriété | type   |
| --------- | ------ |
| x         | number |
| y         | number |
| z         | number |

De plus, votre classe doit implémenter une fonction d'instance appelée `target` qui renvoie une chaîne formatée contenant les coordonnées de la cible de l'instance au format `(x, y, z)`, y compris les parenthèses, les espaces et les virgules.

Voici un exemple d'utilisation de la classe que vous devez créer.

```js
const sln = new TargetingSolution({
  x: 45,
  y: 12,
  z: -1,
});

console.log(sln.target()); // Devrait produire une chaîne de (45, 12, -1)
```

**Notez que votre fonction cible doit utiliser le formatage et l'espacement exacts indiqués !**

Comme toujours, le code que vous pouvez utiliser comme point de départ se trouve dans l'onglet Aide. Une fois que votre code est prêt, cliquez sur le bouton _HACK_ pour remettre ce laser en ligne !

<% } else { %>

Vous examinez les contrôles de ce rayon de stase, mais ils sont actuellement verrouillés. Vous aurez besoin du **code d'accès du physicien théoricien** afin d'activer ce laser.

Le physicien théoricien est probablement dans l'aile nord du laboratoire, où il a étudié la capacité du ducktypium à courber l'espace-temps et à manipuler la matière.

**Parlez au physicien théoricien pour recevoir le code d'accès pour ce rayon.

<% } %>
