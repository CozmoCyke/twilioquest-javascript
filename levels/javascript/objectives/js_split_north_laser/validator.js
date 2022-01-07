const vm = require("vm");
const path = require("path");
const jetpack = require("fs-jetpack");

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isClassDeclaration(obj) {
  return isFunction(obj) && obj.toString && obj.toString().includes("class");
}

module.exports = async (helper) => {
  const { TQ_JAVASCRIPT_WORLD_STATE } = helper.context.levelState;
  const isObjectiveReady =
    TQ_JAVASCRIPT_WORLD_STATE.northWing &&
    TQ_JAVASCRIPT_WORLD_STATE.northWing.hadSavedConversation;

  // The player needs to enable the other beams first
  if (!isObjectiveReady) {
    return helper.fail(`
    Vous ne pouvez pas redémarrer ce laser tant que vous n'avez pas reçu
    le code d'accès du physicien. Voir l'onglet objectif pour plus d'informations.
    `);
  }

  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH,
      "targetingSolution.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "targetingSolution.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word" (mot caché)">${programPath}</span>
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
        __TQ.TargetingSolution = TargetingSolution;
      } catch(e) {
        __TQ.error = e;
      }
    `;

    // Tout d'abord, exécutez le code utilisateur pour vous assurer qu'il s'exécute sans modification.
    let script = new vm.Script(userCode);
    script.runInNewContext(Object.assign({}, scriptContext));

    // En supposant qu'il ne se lance pas, nous pouvons essayer de l'exécuter avec notre test
    // le code est  ajouté à celui-ci.
    script = new vm.Script(testCode);
    script.runInNewContext(scriptContext);

    // Inspecter le contexte du script pour trouver ce que nous voulons.
    const tq = scriptContext.__TQ;

    if (tq.error) {
      console.log(tq.error);
      if (tq.error.name === "ReferenceError") {
        return helper.fail(`
        Il semble qu'une <span class="highlight">TargetingSolution</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la classe 
        "<span class="highlight">TargetingSolution</span>" ? Peut-être que 
        revérifier votre orthographe ?
        `);
      } else {
        return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur réussie est la suivante :
          <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check type of the function
    if (!isClassDeclaration(tq.TargetingSolution)) {
      let message = `
        We found a variable called 
        <span class="highlight">TargetingSolution</span>, but it's not a
        class. Check the Help section for more guidance on creating
        a JavaScript class.
      `;

      return helper.fail(message);
    }

    // Check functionality
    try {
      const result1 = new tq.TargetingSolution({
        x: 32.891,
        y: 120.012,
        z: 345.12,
      });

      if (!isFunction(result1.target)) {
        return helper.fail(`
        Votre TargetingSolution doit avoir une fonction "cible".
        `);
      }

      const result1Target = result1.target().trim();

      if (result1Target !== "(32.891, 120.012, 345.12)") {
        return helper.fail(`
        La fonction <span class="highlight">target</span> de votre
        <span class="highlight">TargetingSolution</span> n'a pas fait revenir
        une chaîne de caractères dans le format spécifié. Elle devrait avoir le format suivant
        <span class="highlight">(x, y, z)</span>, y compris les parenthèses et les
        virgules.
        `);
      }
    } catch (ee) {
      return helper.fail(`
      Une erreur s'est produite lors de l'exécution de votre constructeur ou de vos fonctions TargetingSolution. Veuillez vous assurer que vous pouvez exécuter votre fonction à partir de la ligne de commande 
      avec succès et réessayez. Utilisez le code de démarrage dans la section d'aide si
      vous êtes bloqué. Voici l'erreur que nous avons reçue en essayant d'appeler votre 
      fonction : <br/><br/>
        <span class="highlight">${ee}</span>
      `);
    }

    helper.success(`
    Le laser utilise votre classe de solution de ciblage et émet un rayon dirigé vers
    le centre du cristal de ducktypium. On dirait que ce laser est de nouveau en ligne !
    `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez. Voici l'erreur 
    erreur que nous avons reçue : <br/><br/>
      <span class="highlight">${e}</span>
    `);
  }
};
