# Un Faible bourdonnement sonore

<div class="aside">
<h3>Liste de tâches à accomplir</h3>
<ul>
  <li>Créer un fichier appelé <code>fizzBuzz.js</code></li>.
  <li>Réussir un nombre en tant qu'argument en ligne de commande</li>.
  <li>Affichez le <code>Java</code>, <code>Script</code>,  <code>JavaScript</code>, ou le nombre lui-même comme décrit dans le tableau ci-dessous.</li>
</ul>
</div>

Dans une section largement vide du labo de botanique, vous trouvez un vieux coffre poussiéreux. Il n'a visiblement pas été ouvert depuis un certain temps, et vous ne pouvez vous empêcher de vous demander ce qu'il peut bien contenir.

Une inspection rapide du mécanisme de verrouillage suggère que son heuristique interne est peut-être corrompue. En les remplaçant par un programme fonctionnel, vous pourrez peut-être ouvrir la serrure.

## Réparer le mécanisme de verrouillage du coffre

Créez un fichier appelé `fizzBuzz.js` dans votre dossier de code. Votre programme doit prendre un seul argument en ligne de commande, qui est un nombre entier. Un exemple d'invocation pourrait ressembler à ceci :

```bash
node fizzBuzz.js 15
```

Votre programme doit afficher l'une des quatre choses suivantes, en fonction du nombre passé. Voici ce que votre programme doit afficher, et dans quelles circonstances :

| Numéro d'entrée | Valeur affichée |
| ------------ | ------------- |
| Divisible par 3 | "Java" | 
| Divisible par 5 | Script |
| Divisible par 3 ET 5 | JavaScript |
| NON divisible par 3 OU 5 | Nombre d'entrées |

Par exemple :

* Si l'argument est `3`, votre programme doit afficher `Java`.
* Si l'argument est "5", votre programme doit afficher `JavaScript`
* Si l'argument est `15`, votre programme doit afficher `JavaScript`.
* Si l'argument est `7`, votre programme doit afficher `7`.

Une fois que votre programme fonctionne comme décrit ci-dessus, cliquez sur le bouton *HACK* !
