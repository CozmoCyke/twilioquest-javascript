# Let There Be Life

<div class="aside">
<h3>To-Do List</h3>
<ul>
  <li>Create a file called <code>treeLifeDetector.js</code></li>
  <li>If it is passed the number <code>0</code> as a command line argument, print <code>alive</code></li>
  <li>If it is passed any other number as a command line argument, print <code>other</code></li>
</ul>
</div>

While searching for the means to extend the west bridge in the lab, you discover this control panel. Apparently, the west bridge is disabled because the lab's **Tree Life Detector** system has been damaged.

**YVous devrez réparer le détecteur de vie des arbres** avant de pouvoir continuer vers le botaniste.

## Réparer le détecteur de vie des arbres

Créez un fichier appelé `treeLifeDetector.js` dans votre dossier de code. Ce programme prendra un seul **argument en ligne de commande** - un `Nombre` à un chiffre indiquant le statut de vie actuel d'un arbre. Vous voyez une cartographie actuelle des identifiants de l'état de vie des arbres en chaînes de caractères lisibles par l'homme affichée à côté du panneau de commande :

| Identification du niveau de vie des arbres | Niveau de vie de l'arbre |
| ------------------- | ----------- |
| 0 | "alive" |
| 1 | "other" |
| 2 | "other" |
| 3+ | "other" |

Lorsque votre script est exécuté, il doit imprimer la chaîne de texte lisible par l'homme en fonction du numéro d'identification qui lui a été transmis.

Si le script est exécuté comme ceci :

```bash
node treeLifeDetector.js 0
```

Il devrait afficher la chaîne `alive`.

Si le script est exécuté avec un autre nombre, comme ceci :

``bash
node treeLifeDetector.js 2
```

Il devrait afficher la chaîne `other`.

Une fois que votre script `treeLifeDetector.js` se comporte de cette manière, cliquez sur le bouton *HACK* pour valider votre réparation !
