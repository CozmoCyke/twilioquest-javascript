# Utiliser Git

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Initialiser un répertoire git dans votre dossier de code</li>.
  <li>Commiter le contenu actuel de votre espace de travail</li>.
</ul>
</div>

Vous utilisez la **Flamme de l'open source** pour brûler quelques broussailles protégeant ce coffre à provisions. Il est actuellement verrouillé, mais il semble que vous puissiez l'ouvrir à nouveau en démontrant votre connaissance de git.

Naviguez jusqu'à votre dossier de code JavaScript, où vous avez écrit tout votre code pour cette mission. Il est situé ici : 

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>` 

Une fois là, initialisez un nouveau dépôt et commiter le contenu actuel :

```bash
git init
git add -A
git commit -m "Initial Commit"
```

Ceci va initialiser un dépôt git, ajouter tous les fichiers de votre exemple, et les commiter avec un message. Cliquez sur *HACK* après avoir fait cela pour valider votre travail !
