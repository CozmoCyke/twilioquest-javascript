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
      "divideByTwo.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "divideByTwo.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/>
      <span style="word-wrap:break-word">${programPath}</span>
    `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    const { stdout } = await executeCodeString(TQ_NODE_EXE, userCode, ["128"]);

    if (!stdout.includes("64")) {
      helper.fail(`
      Quand on a exécuté votre script, il n'a pas affiché le résultat de la division du nombre saisi par deux.
      <br/><br/>
      
      Assurez-vous d'avoir <em>modifié la dernière ligne de code</em> dans l'exemple donné dans l'onglet Aide.
    `);
      return;
    }

    helper.success(`
    Vous remplacez le script de division manquant, et les lasers s'éteignent.
    <br/><br/>
    <strong>Allez chercher le mot de passe du laser</strong> sur le bureau du scientifique !
  `);
  } catch (e) {
    helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès et réessayez. Voici l'erreur que nous avons trouvé - désolé
    si le formatage est horrible : <br/><br/>
    ${e}
    `);
  }
};
