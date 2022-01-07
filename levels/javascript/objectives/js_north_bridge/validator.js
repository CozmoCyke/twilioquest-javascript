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
      "northBridgeControl.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "northBridgeControl.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    let result = await executeCodeString(TQ_NODE_EXE, userCode, [
      "asjkdhfahsdf",
    ]);

    if (result.stdout && result.stdout.trim() !== "") {
      helper.fail(`
      Lorsque votre script s'exécute sans l'argument spécial <strong>EXTEND</strong>
      il ne devrait rien afficher du tout. Au lieu de cela, nous avons obtenu :<br/><br/>
        ${result.stdout}
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["EXTEND"]);

    if (
      !result.stdout ||
      !result.stdout.toLowerCase().includes("extending bridge")
    ) {
      helper.fail(`
      Quand votre script reçoit "EXTEND" comme argument, il doit afficher
      "Extension du pont !". Consultez l'exemple de code dans l'onglet 
      <strong>Aide</strong>.
      `);
      return;
    }

    helper.success(`
    Vous remplacez la routine d'activation du pont, et un pont créé d'énergie
    pure s'étend devant vous. <strong>Poursuivez votre route</strong> pour trouver le botaniste !
    `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès et réessayez. Voici l'erreur que nous avons trouvé - désolé
    si le formatage est moche : <br/><br/>
      ${e}
    `);
  }
};
