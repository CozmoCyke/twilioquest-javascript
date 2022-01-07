c# Gagner des arguments

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>politeLasers.js</code></li>.
  <li>Créer une fonction appelée <code>getLaserSetting</code> qui prend un seul argument de type chaîne de caractères.</li>
  <li>Si l'argument est "please", renvoyez la chaîne de caractères "OFF". Sinon, renvoyer la chaîne "ON".</li>
  <li>Cliquez sur <em>HACK</em> lorsque vous avez terminé</li>.
</ul>
</div>

Cette barrière de sécurité fonctionne également mal, et très vite, vous pouvez comprendre pourquoi. Votre vieux pote Glen de l'informatique avait configuré cette barrière de sécurité pour qu'elle ne se ferme que si on lui demande gentiment.

Pour supprimer cette barrière, vous devez écrire une fonction qui prend des [arguments](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions) (également appelés "paramètres") et exécute une [logique booléenne de base](https://fr.javascript.info/ifelse).

Lisez la section "Aide" pour plus d'informations sur les arguments des fonctions. Si vous avez besoin d'aide pour utiliser la logique booléenne, vous pouvez d'abord relever les défis de l'aile sud du labo.

## Faire tomber la barrière

Comme la barrière précédente, celle-ci est alimentée par une **fonction JavaScript** qui détermine si les lasers de la barrière sont "ON" ou "OFF". Vous devrez **surcharger cette fonction** pour désactiver la barrière laser.

Créez un fichier appelé `politeLasers.js` dans votre dossier de code. Dans ce fichier, [créez une fonction JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions) appelée `getLaserSetting`, comme vous l'avez fait dans le dernier défi.

Cette fois, votre fonction doit renvoyer une valeur différente en fonction du **premier argument** de la fonction `getLaserSetting`. Si le premier argument est la chaîne "please", renvoyez "OFF". Si le premier argument est autre chose, renvoyez `ON`.

Une fois que votre code est prêt, cliquez sur le bouton *HACK* pour surcharger la fonction de commande du laser.
