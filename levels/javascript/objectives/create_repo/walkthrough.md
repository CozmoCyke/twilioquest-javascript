# Créer un répertoire Git

Le site officiel de git propose un tutoriel sur [comment créer un répertoire dans un répertoire existant sur votre ordinateur](https://git-scm.com/book/fr/v2/Les-bases-de-Git-D%C3%A9marrer-un-d%C3%A9p%C3%B4t-Git).

Au lieu de leur exemple de nom de projet, vous voudrez créer votre répertoire git à l'intérieur du répertoire de votre espace de travail JavaScript à : `<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`.

## Vos commandes :

1. `cd "<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>"`
2. `git init`
3. `git add -A`
4. `git commit -m "Initial commit"`
