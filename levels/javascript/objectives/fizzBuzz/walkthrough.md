# Une astuce courante

Ce problème est une variante de [l'algorithme d'entretien couramment utilisé connu sous le nom de "Fizz Buzz"] (https://learnjswith.me/javascript-fizzbuzz/). Ce n'est pas un algorithme particulièrement utile, mais c'est un bon moyen de consolider votre connaissance des conditionnels et d'apprendre un nouveau type d'agent !

## Un nombre est-il divisible ? Utilisez un opérateur de reste (modulo).

Votre script doit détecter si un nombre est divisible par un autre nombre. Il existe un opérateur en JavaScript (et dans la plupart des autres langages) qui vous permettra de détecter cela : l'opérateur reste. Cet opérateur est représenté par `%` et revient au reste de la division de deux nombres.

Par exemple :

```js
12 % 5 === 2 ;
4 % 2 === 0 ;
12 % 3 === 0 ;
```

Si un nombre est divisible de manière égale par un autre nombre, le résultat de cette opération `%` sera `0`.

## Code de démarrage

Créez un nouveau fichier JavaScript à cet emplacement :

`<%= env.TQ_JAVASCRIPT_WORKSPACE_PATH.value %>/fizzBuzz.js`.

Vous pouvez utiliser ce qui suit comme code de démarrage :

```js
const numberInput = Number(process.argv[2]) ;
let output = '' ;

if (false) {
  output += 'Java' ;
}

if (false) {
  output += 'Script' ;
}

if (false) {
  output = String(numberInput) ;
}

console.log(output) ;
```

Testez votre code contre différentes entrées avec :

```bash
node fizzBuzz.js 15
```

Une fois que vous sentez que votre code bourdonne correctement, cliquez sur le bouton *HACK* !
