# Logique booléenne plus complexe

Certaines comparaisons booléennes sont plus complexes que d'autres. Il se peut que vous deviez évaluer plusieurs conditions pour déterminer s'il faut brancher votre code ou comment le faire. Pour ce faire, vous devrez utiliser les agents booléens ET ( `&&` ) et OU ( `||` ). Ceux-ci sont parfois appelés **opérateurs logiques**.

[Pour en savoir plus sur ces agents, consultez JavaScript.info](https://fr.javascript.info/logical-operators).

Voici un exemple rapide d'une instruction if avec des comparaisons plus complexes.

```js
const nom = 'Cedric' ;
const estUnRobot = true ;
const niveauPerformance = 1000 ;

if (
  nom === 'Cedric' &&
  estUnRobot &&
  niveauPerformance > 10
) {
  console.log("Oui, c'est notre Cedric!") ;
}
```

## Arrosage au sommet

Pour réparer le système d'arrosage, créez un fichier appelé `shouldWater.js` dans votre dossier de code. Votre dossier de code est situé ici :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>`

Cette fois, vous devrez prendre en compte deux arguments dans votre script - utilisez le code ci-dessous comme point de départ :

```js
const statutVie = Number(process.argv[2]) ;
const niveauSecheresse = Number(process.argv[3]) ;

// Votre instruction if va ci-dessous...
if (false) {
  console.log('EAU') ;
}
```

Vous pouvez tester le code ci-dessus en l'exécutant comme ceci :

```bash
node shouldWater.js 1 20
```

La commande ci-dessus ne devrait rien afficher - son niveau de sécheresse est supérieur à 10, mais son état de vie est de 1 et non de 0.

Ceci devrait afficher `ARROSAGE`, puisque le premier argument est `0` et le second est supérieur à `10` :

```bash
node shouldWater.js 0 11
```

Une fois que votre script fonctionne comme décrit dans l'objectif, cliquez sur *HACK* pour valider votre travail !

## Ressources utiles

* [MDN Intro to Conditionals](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/conditionals)
* [JavaScript.info - Opérateurs logiques](https://fr.javascript.info/logical-operators)
