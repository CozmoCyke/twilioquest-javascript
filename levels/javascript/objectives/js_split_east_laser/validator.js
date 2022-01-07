const vm = require("vm");
const path = require("path");
const jetpack = require("fs-jetpack");

const isFunction = function (obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

module.exports = async (helper) => {
  const { TQ_JAVASCRIPT_WORLD_STATE } = helper.context.levelState;
  const isObjectiveReady =
    TQ_JAVASCRIPT_WORLD_STATE.eastWing &&
    TQ_JAVASCRIPT_WORLD_STATE.eastWing.hadSavedConversation;

  // The player needs to enable the other beams first
  if (!isObjectiveReady) {
    return helper.fail(`
    Vous ne pouvez pas redémarrer ce laser avant d'avoir reçu le code d'accès 
    de l'ingénieur électricien. Voir l'onglet de l'objectif pour plus d'informations.
    `);
  }

  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH,
      "laserPower.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "laserPower.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
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
        __TQ.calculatePower = calculatePower;
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
      if (tq.error.name === "ReferenceError") {
        return helper.fail(`
        Il semble qu'une fonction <span class="highlight">calculatePower</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la fonction 
        "<span class="highlight">calculatePower</span>" ? Peut-être que vous pouvez  
        revérifier votre orthographe ?
      `) ;
    } else {
      return helper.fail(`)
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
        <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check type of the function
    if (!isFunction(tq.calculatePower)) {
      let message = `
      Nous avons trouvé une variable appelée 
      <span class="highlight">calculatePower</span>, mais ce n'est pas une
      fonction appelable. Consultez la section Aide pour obtenir plus de conseils sur la création
      d'une fonction JavaScript.
    `;

      return helper.fail(message);
    }

    // Check functionality
    try {
      const result = tq.calculatePower([]);
      const result2 = tq.calculatePower([4, 1, 10]);

      if (result === undefined || result === null) {
        return helper.fail(`
        Il semble que votre fonction ne renvoie pas encore de valeur. La dernière
        ligne de code de votre fonction avant le "}" doit utiliser le mot-clé
        <span class="highlight">return</span> pour renvoyer une valeur de une valeur quelconque à la suite de l'exécution de la fonction. Voir l'exemple de code
        dans la section Aide.
      `);
      }

      if (isNaN(result)) {
        return helper.fail(`
        Il semble que votre fonction ne renvoie pas un nombre. Votre fonction fonction doit renvoyer un nombre, qui correspond à la longueur totale de toutes les
        chaînes de caractères dans le tableau d\'entrée.
        `);
      }

      if (result !== 0 || result2 !== 30) {
        return helper.fail(`
          Your function returned a number, but not the number we were looking 
          for. Check the Help and Objective tabs to ensure you are returning
          the right numeric value.
        `);
      }
    } catch (ee) {
      return helper.fail(`
        There was an error executing your calculatePower function. Please 
        ensure that you can exercise your function from the command line 
        successfully and try again. Use the starter code in the Help section if
        you are stuck. Here's the error we got from trying to call your 
        function: <br/><br/>
        <span class="highlight">${ee}</span>
      `);
    }

    helper.success(`
      Boomshakalaka! The laser roars to life, and you're that much closer to
      reversing the experiment.
    `);
  } catch (e) {
    helper.fail(`
      There was an error executing your JavaScript code. Please ensure that you
      can run it from the command line successfully and try again. Here's the 
      error we got: <br/><br/>
      <span class="highlight">${e}</span>
    `);
  }
};
