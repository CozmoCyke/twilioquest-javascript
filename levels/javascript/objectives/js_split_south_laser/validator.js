const path = require("path");
const jetpack = require("fs-jetpack");
const {
  executeCodeString,
} = require("../../../../scripts/objectiveValidation");

module.exports = async (helper) => {
  try {
    const { TQ_NODE_EXE, TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, "sortOrder.js");

    const { TQ_JAVASCRIPT_WORLD_STATE } = helper.context.levelState;
    const isObjectiveReady =
      TQ_JAVASCRIPT_WORLD_STATE.eastWing &&
      TQ_JAVASCRIPT_WORLD_STATE.southWing.hadSavedConversation;

    // Le joueur doit d'abord activer les autres rayons.
    if (!isObjectiveReady) {
      return helper.fail(`
      Vous ne pouvez pas redémarrer ce laser tant que vous n'avez pas
      reçu le code d'accès du botaniste. Voir l'onglet objectif pour plus d'informations.
      `);
    }

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "sortOrder.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    let result = await executeCodeString(TQ_NODE_EXE, userCode, ["a", "b"]);

    if (!result.stdout || result.stdout.trim() !== "-1") {
      helper.fail(`
      Votre script doit afficher "-1" lorsque le premier argument qui lui est passé
      apparaît plus tôt dans l'ordre alphabétique que le second argument.
    `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, [
      "apples",
      "Ability",
    ]);

    if (!result.stdout || result.stdout.trim() !== "1") {
      helper.fail(`
      Votre script doit afficher "1" lorsque le premier argument qui lui est passé
      apparaît alphabétiquement plus tard que le second argument.
    `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, [
      "apples",
      "APPleS",
    ]);

    if (!result.stdout || result.stdout.trim() !== "0") {
      helper.fail(`
      Votre script doit afficher "0" lorsque le premier argument qui lui a été passé
      est le même (en ignorant la casse) que le second argument.
    `);
      return;
    }

    helper.success(`
    Votre script de comparaison semble fonctionner - le rayon de stase 2 s'anime !
    `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès et réessayez. Voici l'erreur que nous avons trouvée - désolé
    si le formatage est horrible : <br/><br/>
    ${e}
    `);
  }
};
