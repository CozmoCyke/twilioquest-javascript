# Littéralement un objet

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>construction.js</code>.</li>
  <li>Créer une fonction appelée <code>construct</code> qui prend un seul argument de type chaîne de caractères.</li>
  <li>Votre fonction doit renvoyer un objet comme décrit ci-dessous.</li>
</ul>
</div>

L'aile nord du labo contient un étrange dispositif au centre de la pièce, dont le but n'était pas immédiatement évident lorsque vous êtes entré. En inspectant la console située devant vous, vous en déduisez qu'il s'agit du panneau de commande d'un **instanciateur de matière**. Ce doit être la grande chambre au centre de la pièce !

La console, cependant, est remplie de journaux d'erreurs indiquant qu'elle a été endommagée lors de l'explosion du labo. Si vous pouvez réussir à remettre cette console (et une autre comme elle) en ligne, la chambre au milieu du labo devrait être de nouveau fonctionnelle.

## Créer un objet littéral

L'instanciateur de matière est capable de créer de nouveaux objets à partir de rien ! La fonction JavaScript que vous devrez corriger dans cet objectif est également responsable de la fabrication d'objets, en utilisant la [notation littérale des objets](https://fr.javascript.info/object#litteraux-et-proprietes).

Créez un fichier appelé `construction.js` dans votre dossier de code. Dans ce fichier, créez une fonction appelée `construct` qui renvoie un [objet littéral](https://fr.javascript.info/object#litteraux-et-proprietes) avec les propriétés suivantes :

| Propriété | Type | Valeur | Remarques
| -------- | ------- | ------- | --------------------------------------------------------------------- |
| name | string | See Notes | Ce sera le premier argument passé à votre fonction `construct` |
| material | string | 'human' | |
| assemble | boolean | true | |
| duration | number | 1000 | |

Lorsque vous avez écrit une fonction qui peut effectuer la tâche décrite ci-dessus, cliquez sur le bouton *HACK* !