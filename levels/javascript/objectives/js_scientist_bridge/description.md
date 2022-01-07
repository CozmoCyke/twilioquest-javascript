# Conditions complexes

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>enhancedLifeDetector.js</code></li>.
  <li>Affichez le statut approprié de vie de l'arbre en fonction de l'argument de ligne de commande que votre script reçoit (voir le tableau ci-dessous)</li>.
</ul>
</div>

Le dernier pont qui vous sépare du botaniste est également désactivé. Comme le pont ouest, celui-ci a échoué parce que le **Détecteur de vie des arbres** est sous configuré.

Cette fois, vous devrez créer une version améliorée du script Tree Life Detector pour prolonger le pont.

## Un Tree Life Detector amélioré

Créez un fichier appelé `enhancedLifeDetector.js` dans votre dossier de code. Ce programme prendra un seul **argument de ligne de commande** - un `Nombre` à un chiffre indiquant le statut de vie actuel d'un arbre. Il affiche ensuite une chaîne de texte lisible par l'homme indiquant l'état actuel d'un arbre.

Ci-dessous, vous pouvez voir une correspondance entre les identifiants de l'état de vie de l'arbre et les chaînes de caractères lisibles par l'homme, avec plus de statuts que les seuls `vivant` et `autre` :

| ID du statut de vie de l'arbre | Statut de l'arbre |
| ------------------- | ----------- |
| 0 | "vivant" |
| 1 | "floraison" |
| 2 | "mue" |
| 3+ | "autre" |

Lorsque votre script est exécuté, il doit afficher la chaîne de texte lisible en fonction du numéro d'identification qui est passé.

Si le script est exécuté comme ceci :

```bash
node treeLifeDetector.js 2
```

Il devrait afficher la chaîne `mue`. Si le nombre passé n'est pas 0, 1 ou 2, votre script devrait afficher `autre`.

Pour relever ce défi, vous devrez utiliser une logique booléenne plus complexe que précédemment. Consultez la section **Aide** pour plus de détails.

Une fois que votre script `enhancedLifeDetector.js` se comporte de cette manière, cliquez sur le bouton *HACK* pour valider votre travail !
