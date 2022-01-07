# Apprendre à exécuter du code JavaScript

L'objectif de cet exercice est de vous familiariser avec la création et l'exécution de programmes JavaScript sur votre ordinateur. Pour cet exercice, nous vous fournirons tout le code dont vous avez besoin pour relever le défi. Dans les prochains exercices cependant, vous devrez écrire une plus grande partie du code vous-même !

<details>
<summary>Etape 1 : créer un fichier de code JavaScript</summary>.

Vous devrez d'abord créer un nouveau fichier sur votre ordinateur appelé `sayPlease.js` à l'intérieur du dossier que vous avez créé comme espace de travail TwilioQuest. Pour rappel, ce dossier est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

L'extension **fichier** (la partie `.js`) indique le type de fichier que vous créez. Les fichiers sonores peuvent avoir une extension `.mp3`. Un document Microsoft Word peut avoir une extension `.docx`. Les fichiers JavaScript ont (généralement) une extension `.js`.

Il sera probablement plus pratique de créer ces fichiers à l'aide de l'interface du terminal, puisque vous devrez de toute façon l'utiliser plus tard pour exécuter votre code JavaScript.

Pour créer le fichier sur Mac ou Linux, utilisez les commandes suivantes dans l'application terminal :

```bash
cd "<<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>"
touch sayPlease.js
```

Dans PowerShell sous Windows, utilisez les commandes suivantes :

```bash
cd "<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>"
New-Item sayPlease.js
```

</details>


<details>
<summary>Étape 2 : ouvrir le fichier et écrire le code de la solution</summary>.

Après avoir créé votre fichier JavaScript, vous devez maintenant y mettre du code ! Tout comme vous pourriez utiliser Photoshop pour ouvrir et modifier un fichier image, vous aurez besoin d'un programme installé sur votre ordinateur pour modifier les fichiers de code. En programmation, ces outils sont appelés **Environnements de développement intégré (IDE)** ou **éditeurs de texte**.

Si vous n'avez pas installé l'un de ces programmes, nous vous recommandons d'essayer [Visual Studio Code] (https://code.visualstudio.com/). VS Code est un éditeur de texte de programmation relativement léger, mais doté de nombreuses fonctionnalités prêtes à l'emploi et capable de faire des choses très complexes et puissantes une fois que vous l'avez pris en main.

En utilisant VS Code ou l'éditeur de texte de votre choix, ouvrez le fichier `sayPlease.js`. Initialement, le fichier ne contiendra probablement rien.

Pour ce défi, nous allons vous fournir tout le code dont vous avez besoin - prenez le code ci-dessous, et copiez-le dans le fichier. Ne vous inquiétez pas si vous ne comprenez pas encore ce qu'il fait, mais comme vous allez le voir dans un instant, il utilise une fonction JavaScript intégrée appelée `console.log` pour imprimer une ligne de texte dans la fenêtre du terminal :

```js
console.log('Glen, will you please open the barrier?') ;
```

Une fois que vous avez ajouté ce code au fichier, assurez-vous de **sauvegarder les modifications apportées !** Maintenant, vous êtes prêt à exécuter le code et à voir ce qu'il fait.

</details>

<details>
<summary>Étape 3 : Exécuter le code et s'assurer qu'il fonctionne</summary>.

Maintenant, nous allons utiliser le runtime Node.js que vous avez installé pour exécuter réellement le code à l'intérieur de `sayPlease.js`. Habituellement, vous ferez cela en utilisant l'application d'invite de commande sur votre ordinateur - Terminal.app sur un Mac, ou PowerShell sur Windows.

Ouvrez votre application Terminal et entrez la commande suivante pour vous assurer que votre "répertoire de travail actuel" est le dossier dans lequel vous avez créé `sayPlease.js`.

```bash
cd "<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>"
```

Ensuite, utilisez la commande `node` pour exécuter votre code JavaScript :

```bash
node sayPlease.js
```

Après avoir exécuté la commande ci-dessus, vous devriez voir votre demande polie à Glen s'imprimer dans la console.

</details>

Tout au long de TwilioQuest, il vous sera demandé de créer, modifier et exécuter des fichiers de code comme décrit ci-dessus.

Lorsque votre fichier `sayPlease.js` peut s'exécuter et imprimer le message nécessaire, cliquez sur le bouton *HACK* pour soumettre votre demande au service informatique.
