const path = require("path");
const jetpack = require("fs-jetpack");
const {
  executeCodeString,
} = require("../../../../scripts/objectiveValidation");

module.exports = async (helper) => {
  try {
    const { TQ_NODE_EXE, TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH,
      "treeLifeDetector.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "treeLifeDetector.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    let result = await executeCodeString(TQ_NODE_EXE, userCode, ["11"]);

    if (result.stdout && result.stdout.trim() !== "other") {
      helper.fail(`
      Quand on passe à votre script quelque chose d'autre que 0, il devrait imprimer 
      "other". A la place, nous avons :<br/><br/>
      <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["0"]);

    if (!result.stdout || result.stdout.trim() !== "alive") {
      helper.fail(`
      Quand on passe 0 à votre script, il devrait imprimer 
      "alive". Au lieu de cela, nous avons :<br/><br/>
      <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    helper.success(`
      You patch the Tree Life Detector with your fix, and in the distance you
      can hear the western bridge hum to life.<br/><br/> 
      <strong>Continue onward</strong> 
      to find the botanist!
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
