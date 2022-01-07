# Aide sur l'objectif

Pour relever ce défi, vous devez d'abord [installer Node.js sur votre ordinateur] (https://www.nodejs.org). Nous utiliserons cet outil pour exécuter le code JavaScript que vous apprendrez à écrire.

## Réussir à obtenir le chemin d'accès complet au moteur Node.js

Après avoir installé Node, l'interface de ligne de commande que vous utilisez sur votre ordinateur devrait avoir les commandes `node` et `npm` disponibles. À partir de la ligne de commande sur Mac et Linux, vous devriez pouvoir utiliser cette commande pour réussir à obtenir le chemin complet vers le moteur Node :

``bash
which node
```

Sous Windows, dans PowerShell, vous pouvez utiliser cette commande :

``bash
Get-Command node.exe | Select-Object -ExpandProperty Définition
```

Une fois que vous avez le chemin complet, collez-le dans le champ de texte à droite et cliquez sur *HACK*.