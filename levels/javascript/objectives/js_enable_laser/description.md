<%
const worldState = levelState.TQ_JAVASCRIPT_WORLD_STATE;
%>

# Une révélation incendiaire

L'équipe de recherche TwilioQuest est sur le point de tenter une expérience révolutionnaire. En utilisant quatre prototypes de rayons de stabilisation moléculaire, ils seront les premiers scientifiques à observer le **ducktypium**, la mystérieuse source du pouvoir de JavaScript, sous une forme solide ! Mais pour que l'expérience puisse se poursuivre, **le quatrième rayon laser, qui fonctionne mal, doit être redémarré**.

<% if (worldState.room1.passwordFound) { %>

## Redémarrer le rayon de stase qui fonctionne mal.

Après une série d'essais, vous avez découvert que le mot de passe du laser est `PEW PEW PEW!` - entrez le mot de passe dans le champ de texte à droite et cliquez sur _HACK_. Pour la science !

<% } else { %>

Il semble que vous ayez besoin d'un mot de passe pour redémarrer le laser. **Parlez à la scientifique en chef** (vous êtes passé devant elle en entrant dans la pièce) pour réussir à obtenir le mot de passe !

<% } %>
