const vm = require('vm');
const path = require('path');
const jetpack = require('fs-jetpack');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function getMissingKeys(expected, actual) {
  return Object.keys(expected).filter(
    expectedKey =>
      !Object.keys(actual).some(actualKey => actualKey === expectedKey)
  );
}

function doesEntryMatch(
  [actualKey, actualValue],
  [expectedKey, expectedValue]
) {
  if (actualKey !== expectedKey) {
    // only compare matching keys
    return false;
  }

  if (actualValue === expectedValue) {
    return true;
  }

  return false;
}

function getObjectKeysWithMismatchedValues(expected, actual) {
  return Object.entries(expected)
    .filter(expectedEntry => {
      return !Object.entries(actual).some(actualEntry =>
        doesEntryMatch(actualEntry, expectedEntry)
      );
    })
    .map(([key]) => key);
}

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH,
      'construction.js'
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "construction.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/>
      <span style="word-wrap:break-word">${programPath}</span>
    `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);
    const scriptContext = {
      process: process,
      __TQ: {},
    };
    const testCode = `
      ${userCode};
      
      try {
        __TQ.construct = construct;
      } catch(e) {
        __TQ.error = e;
      }
    `;

    // First, execute user code to ensure it runs unchanged
    let script = new vm.Script(userCode);
    script.runInNewContext(Object.assign({}, scriptContext));

    // Assuming that it doesn't throw, we can try running it with our test
    // code appended to it.
    script = new vm.Script(testCode);
    script.runInNewContext(scriptContext);

    // Inspect the script context for the stuff we want
    const tq = scriptContext.__TQ;

    if (tq.error) {
      console.log(tq.error);
      if (tq.error.name === 'ReferenceError') {
        return helper.fail(`
        Il semble qu'une fonction <span class="highlight">construct</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la fonction 
        "<span class="highlight">construct</span>" ? Peut-être que vous pouvez revérifier votre orthographe ?
      `);
      } else {
        return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
        <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check type of the function
    if (!isFunction(tq.construct)) {
      let message = `
      Nous avons trouvé une variable appelée 
      <span class="highlight">construct</span>, mais ce n'est pas une
      fonction appelable. Consultez la section *Aide* pour obtenir plus de conseils sur la création
      d'une fonction JavaScript.
      `;

      return helper.fail(message);
    }

    // Check functionality
    try {
      const result1 = tq.construct('Gene');
      const result2 = tq.construct('Irene');

      if (result1 === undefined || result1 === null) {
        return helper.fail(`
        Il semble que votre fonction ne retourne pas encore de valeur. La dernière
        ligne de code de votre fonction avant le "}" doit utiliser le mot-clé
        <span class="highlight">return</span> pour vous renvoyer une valeur de type quelconque
        à la suite de l'exécution de la fonction. Voir l'exemple de code
        dans la section *Aide*.
        `);
      }

      if (typeof result1 !== 'object') {
        return helper.fail(`
        Il semble que votre fonction ne renvoie pas un objet. Votre fonction doit renvoyer un objet littéral.
        `);
      }

      const expected1 = {
        name: 'Gene',
        material: 'human',
        assemble: true,
        duration: 1000,
      };

      const result1MissingKeys = getMissingKeys(expected1, result1);
      if (result1MissingKeys.length > 0) {
        return helper.fail(`
        Il semble que certaines clés manquent à l'objet retourné.
          
        Les clés ${result1MissingKeys} étaient manquantes !
      `);
      }

      const result1MismatchedKeys = getObjectKeysWithMismatchedValues(
        expected1,
        result1
      );
      if (result1MismatchedKeys.length > 0) {
        return helper.fail(`
        Toutes les clés de votre objet renvoyé ne correspondent pas correctement.
        <br/><br/>
        ${result1MismatchedKeys
            .map(key => `"${key}" should have been ${expected1[key]}.`)
            .join('<br/>')}
        `);
      }

      const expected2 = {
        name: 'Irene',
        material: 'human',
        assemble: true,
        duration: 1000,
      };

      const result2MismatchedKeys = getObjectKeysWithMismatchedValues(
        expected2,
        result2
      );
      if (result2MismatchedKeys.length > 0) {
        return helper.fail(`
        Toutes les clés de votre objet renvoyé ne correspondent pas exactement.
        <br/><br/>
          ${result2MismatchedKeys
            .map(key => `"${key}" should have been ${expected2[key]}.`)
            .join('<br/>')}
        `);
      }
    } catch (ee) {
      return helper.fail(`
      Une erreur s'est produite lors de l'exécution de votre fonction de construction. 
      Assurez-vous de pouvoir exécuter votre fonction depuis la ligne de commande 
      avec succès et réessayez. Utilisez le code de démarrage dans la section d'aide si
      vous êtes bloqué. Voici l'erreur que nous avons trouvée en essayant d'appeler votre 
      fonction : <br/><br/>
        <span class="highlight">${ee}</span>
      `);
    }

    helper.success(`
    Cela a fait l'affaire ! La fonction d'instanciateur de matière pour cette console est
    réparée.
    `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez.
    Voici l'erreur que nous avons trouvé : <br/><br/>
      <span class="highlight">${e}</span>
    `);
  }
};
