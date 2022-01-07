# Gagner les arguments

Le but de cet objectif est de vous familiariser avec le concept des [arguments en ligne de commande] (https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/). Il s'agit de données qui sont passées à votre code JavaScript lorsqu'il est exécuté, afin de lui donner un certain contexte lors de son exécution.

Jusqu'à présent, vous avez exécuté vos scripts de test avec une commande qui ressemble à ceci.

```bash
node unProgramme.js
```

Votre code s'exécute alors, en exécutant les instructions que vous avez écrites.

Cependant, il est souvent utile de passer des données initiales dans un programme que vous avez écrit. Nous appelons ces données initiales **arguments**. Pour exécuter un script avec des arguments, vous pouvez saisir du texte supplémentaire après le nom de votre fichier de code, séparé par des espaces. Voici un exemple d'exécution d'un script avec trois arguments :

``bash
node someProgram.js "argument un" "autre argument" allOneWordNoQuotes
```

Vous pouvez accéder à ces arguments dans votre code en utilisant une liste spéciale nommée [process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv).

Dans cet objectif, on vous a demandé d'écrire un programme qui fonctionne avec un argument en ligne de commande. C'est un peu difficile au début, donc voici le code dont vous aurez besoin comme point de départ :

```js
// La ligne de code ci-dessous lit la valeur de l'argument passé à la suite de
// le nom de votre script
const argumentValue = process.argv[2] ;

// Cette ligne de code convertit l'argument en une valeur numérique
const numberValue = Number(argumentValue) ;

// Cette ligne de code divise le nombre entré par deux, et stocke le résultat dans une variable nommée "result".
// une variable nommée "result".
const result = numberValue / 2 ;

// Vous devez terminer la ligne de code ci-dessous ! 
// Comment afficher le résultat dans la fenêtre du terminal sans coder en dur le nombre 42 ?
console.log(42) ;
```

Ajoutez le code ci-dessus à un fichier appelé `divideByTwo.js` dans votre répertoire de code. Pour référence, votre répertoire de code peut être trouvé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Une fois que vous avez fait cela, vous devrez modifier la dernière ligne du programme pour afficher le résultat de la division du nombre d'entrée par deux. Pour tester votre code, exécutez-le depuis un terminal comme ceci.

bash
node divideByTwo.js 400
```

Si votre code est correct, il affichera le nombre `200` après son exécution. N'oubliez pas que vous devrez modifier le code de démarrage ci-dessus pour que cela fonctionne !

Une fois que votre script fonctionne correctement, cliquez sur le bouton *HACK*.

## Ressources utiles

* [Node.js Arguments en ligne de commande] (https://nodejs.org/fr/knowledge/command-line/how-to-parse-command-line-arguments/)
* [Documents de référence pour process.argv](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
