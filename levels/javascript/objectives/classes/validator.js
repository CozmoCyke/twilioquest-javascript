const vm = require('vm');
const path = require('path');
const jetpack = require('fs-jetpack');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isClassDeclaration(obj) {
  return isFunction(obj) && obj.toString && obj.toString().includes('class');
}

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, 'classes.js');

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "classes.js" dans votre 
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
        __TQ.Materializer = Materializer;
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
        Il semble qu'une classe <span class="highlight">Materializer</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script. 
        <br/><br/>
        Avez-vous nommé la classe 
        "<span class="highlight">Materializer</span>" ? Peut-être que vous pouvez vérifier son orthographe ?
        `);
      } else {
        return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur que nous avons trouvé était :
          <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check type of the function
    if (!isClassDeclaration(tq.Materializer)) {
      let message = `
      Nous avons trouvé une variable appelée 
      <span class="highlight">Materializer</span>, mais ce n'est pas une
      classe. Consultez la section Aide pour obtenir plus de conseils sur la création d'une classe JavaScript.
      `;

      return helper.fail(message);
    }

    // Check functionality
    try {
      const result1 = new tq.Materializer('Gene');
      const result2 = new tq.Materializer('Irene');

      if (result1.target !== 'Gene') {
        return helper.fail(`
        Il semble que votre matérialiseur ne lise pas correctement sa cible dans la fonction constructeur.
        `);
      }

      if (result1.activated !== false) {
        return helper.fail(`
        Votre Materializer doit commencer avec une propriété "activated" qui est
        définie à false.
        `);
      }

      if (!isFunction(result1.activate)) {
        return helper.fail(`
        Votre matérialiseur doit avoir une fonction "activate".
        `);
      }

      if (!isFunction(result1.materialize)) {
        return helper.fail(`
        Votre Materializer doit avoir une fonction "materialize".
        `);
      }

      result1.activate();

      if (result1.activated !== true) {
        return helper.fail(`
        La fonction "activate" de votre Materializer doit définir l'activation à
        true lorsqu'elle est exécutée.
        `);
      }

      const result1Target = result1.materialize();

      if (result1Target !== 'Gene') {
        return helper.fail(`
        La fonction "materialize" de votre matérialiseur doit renvoyer votre cible, "Gene", lorsqu'elle est activée.
        `);
      }

      const result2Target = result2.materialize();

      if (result2Target !== undefined) {
        return helper.fail(`
        La fonction "materialize" de votre Materializer doit vous renvoyer undefined lorsqu'elle n'est pas activée.
        `);
      }
    } catch (ee) {
      return helper.fail(`
      Une erreur s'est produite lors de l'exécution de votre constructeur ou de vos fonctions Materialize. Veuillez vous assurer que vous pouvez exécuter votre fonction depuis la ligne de commande 
      avec succès et réessayez. Utilisez le code de démarrage dans la section Aide si vous êtes bloqué. Voici l'erreur que nous avons obtenue en essayant d'appeler votre fonction 
      fonction : <br/><br/>
        <span class="highlight">${ee}</span>
      `);
    }

    helper.success(`
    Vous avez réussi ! La console de l'instanciateur de matière revient à la vie, rétablissant
    une fonctionnalité partielle à la chambre au centre de la pièce.
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
