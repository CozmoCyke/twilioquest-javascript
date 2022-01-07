const path = require("path");
const jetpack = require("fs-jetpack");
const {
  executeCodeString,
} = require("../../../../scripts/objectiveValidation");

module.exports = async (helper) => {
  try {
    const { TQ_NODE_EXE, TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, "sayPlease.js");

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "sayPlease.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    const { stdout } = await executeCodeString(TQ_NODE_EXE, userCode);

    if (!stdout.includes("please")) {
      helper.fail(`
      Lorsque nous avons exécuté votre script, il n'a pas imprimé le "mot magique". 
      <br/><br/>
      
      Vérifiez deux fois que lorsque vous exécutez votre script, il s'exécute avec succès
      et sort un message qui contient le mot "s'il vous plaît".
    `);
      return;
    }

    helper.success(`
    Vous soumettez votre requête polie à Glen en informatique, et en quelques instants,
    la barrière laser s'estompe.
    <br/><br/>
    Vous pouvez maintenant poursuivre votre route vers le bureau.
    `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès et réessayez. Voici l'erreur que nous avons reçue - désolé
    si le formatage est horrible : <br/><br/>
      ${e}
    `);
  }
};
