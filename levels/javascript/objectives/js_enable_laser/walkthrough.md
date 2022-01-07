<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
%>

<% if (worldState.room1.passwordFound) { %>

# Mot de passe, SVP

Après une série d'essais, vous avez découvert que le mot de passe du laser est `PEW PEW PEW!` - entrez le mot de passe dans le champ de texte à droite et cliquez sur _HACK_. Pour la science !

<% } else { %>

# Obtenez d'abord le mot de passe !

Vous ne pourrez pas redémarrer le laser sans un **mot de passe spécial**. Pour obtenir le mot de passe, **parlez à la scientifique principale** (vous êtes passé devant elle en entrant dans la pièce). Elle vous indiquera la bonne direction !

<% } %>
