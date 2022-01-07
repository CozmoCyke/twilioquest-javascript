# Première Classe

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>classes.js</code>.</li>
  <li>Créer une classe appelée <code>Materializer</code> qui prend un seul argument de type chaîne de caractères.</li>
  <li>Votre fonction doit renvoyer un objet comme décrit ci-dessous.</li>
</ul>
</div>

L'aile nord du labo contient un étrange dispositif au centre de la pièce, dont le but n'était pas immédiatement évident lorsque vous êtes entré. En inspectant la console située devant vous, vous en déduisez qu'il s'agit du panneau de commande d'un **instanciateur de matière**. Ce doit être la grande chambre au centre de la pièce !

La console, cependant, est remplie de journaux d'erreurs indiquant qu'elle a été endommagée lors de l'explosion du labo. Si vous pouvez réussir à remettre cette console (et une autre comme elle) en ligne, la chambre au milieu du labo devrait être de nouveau fonctionnelle.

### Réparer la console avec la classe

Afin de réparer ce composant de l'instanciateur de matière, vous devez remplacer un morceau de code JavaScript qui fournit un objet de configuration utilisé dans le processus de transformation.

Créez un fichier appelé `classes.js` dans votre dossier de code. Dans ce fichier, [créez une classe](https://javascript.info/class) appelée `Materializer`.

Elle doit avoir :

- une propriété appelée `target` qui est définie comme étant égale au premier argument du constructeur
- une propriété `activated` dont la valeur par défaut est `false`.
- une fonction d'instance appelée `activate` qui définit la valeur true de `activated`.
- une fonction d'instance appelée `materialize` qui revient à la valeur de la propriété `target` d'une instance si la propriété `activated` est définie à true. Sinon, elle retourne `undefined` (rien n'est retourné).

Lorsque vous avez créé une classe `Materializer` qui répond aux critères ci-dessus, cliquez sur *HACK* pour valider votre travail !
