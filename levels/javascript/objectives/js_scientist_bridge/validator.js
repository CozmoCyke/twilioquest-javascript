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
      "enhancedLifeDetector.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "enhancedLifeDetector.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
        <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    let result = await executeCodeString(TQ_NODE_EXE, userCode, ["11"]);

    if (result.stdout && result.stdout.trim() !== "autre") {
      helper.fail(`
      Quand on passe à votre script un nombre autre que 0, 1 ou 2, il doit afficher 
      "autre". Au lieu de cela, nous avons obtenu:<br/><br/>
        <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["0"]);

    if (!result.stdout || result.stdout.trim() !== "vivant") {
      helper.fail(`
      Quand on passe 0 à votre script, il devrait afficher 
      "vivant". Au lieu de cela, nous avons obtenu:<br/><br/>
        <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["1"]);

    if (!result.stdout || result.stdout.trim() !== "floraison") {
      helper.fail(`
      Quand on passe 1 à votre script, il devrait afficher 
      "floraison". Au lieu de cela, nous avons obtenu :<br/><br/>
        <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["2"]);

    if (!result.stdout || result.stdout.trim() !== "mue") {
      helper.fail(`
      Quand votre script passe 2, il devrait afficher 
      "mue". Au lieu de cela, nous avons obtenu:<br/><br/>
        <strong>${result.stdout}</strong>
        <br/>
      `);
      return;
    }

    helper.success(`
    Les améliorations que vous avez apportées au détecteur de vie d'arbres semblent fonctionner !
    Le pont devant vous bourdonne à la vie, et le chemin vers le botaniste est
    enfin dégagé. <br/><br/> 
    <strong>En avant !</strong>
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
