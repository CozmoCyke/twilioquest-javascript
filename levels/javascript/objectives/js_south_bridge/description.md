# Arroser, arroser, petite plante

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>shouldWater.js</code></li>.
  <li>Déclarez deux nombres comme arguments en ligne de commande - le premier est l'identifiant de l'état de vie d'un arbre, et le second est son niveau de sécheresse.</li>.
  <li>Si le premier argument est <code>0</code> ET que le second est supérieur à <code>10</code>, affichez le texte <code>WATER</code></li>.
</ul>
</div>

Niché dans le coin sud-est du laboratoire de botanique, vous remarquez un autre système qui a été endommagé lors de l'incident du ducktypium. Il semble que le système d'arrosage automatique se soit éteint, ce qui a également **désactivé d'une manière ou d'une autre le pont sud**.

Afin de garder les plantes hydratées - et de prolonger le pont sud - vous devrez réparer le système d'arrosage automatique.

## Faire pleuvoir

Une inspection du système d'arrosage révèle un autre problème avec sa logique booléenne. Pour le corriger, créez un fichier nommé `shouldWater.js` dans votre dossier de code. Ce script prendra **deux arguments en ligne de commande** - tous les deux seront des nombres.

* Le premier argument est le statut de vie de la plante - "0" signifie que la plante est vivante.
* Le second est le niveau de sécheresse de la plante - tout ce qui est supérieur à 10 signifie que la plante a besoin d'eau.

Un exemple d'invocation de votre script avec une plante vivante (état `0`) et un niveau de sécheresse `20` ressemblerait à ceci :

```bash
node shouldWater.js 0 20
```

Pour que le système d'arrosage fonctionne correctement, ce script ne doit afficher la chaîne `ARROSAGE` que si le premier argument du script est `0` et que le second argument est un nombre supérieur à `10`. Sinon, il ne doit rien afficher.

Une fois que votre code se comporte comme décrit ci-dessus, cliquez sur le bouton *HACK* pour réparer l'arroseur !
