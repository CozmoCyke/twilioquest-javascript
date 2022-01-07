const USERNAME = 'admin';
const WRONG_NAME = 1337; // Hmm, est-ce que c'est juste ?

function formatLaserAuth() {
  // Hmm, la ligne ci-dessous semble également erronée...
  const formattedString = USERNAME + ':' + 'cupcakes';
  return formattedString;
}

// Ceci teste votre code, il n'est pas nécessaire de modifier quoi que ce soit ci-dessous !
console.log('Résultat attendu : "admin:PEW PEW PEW!"');
console.log(`Votre résultat     : "${formatLaserAuth()}"`);
