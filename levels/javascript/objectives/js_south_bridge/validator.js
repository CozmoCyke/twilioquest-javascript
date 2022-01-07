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
      "shouldWater.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "shouldWater.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
        <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);

    let result = await executeCodeString(TQ_NODE_EXE, userCode, ["0", "10"]);

    if (result.stdout && result.stdout.trim() !== "") {
      helper.fail(`
      Votre script ne doit rien afficher si le second argument est plus petit ou égal à 10.
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["1", "11"]);

    if (result.stdout && result.stdout.trim() !== "") {
      helper.fail(`
      Votre script ne doit rien afficher si le premier argument est différent de 0.
      `);
      return;
    }

    result = await executeCodeString(TQ_NODE_EXE, userCode, ["0", "11"]);

    if (!result.stdout || !result.stdout.toLowerCase().includes("arrosage")) {
      helper.fail(`
      Lorsque votre script reçoit 0 comme premier argument et un nombre supérieur à 10 comme second
      supérieur à 10 comme second argument, il doit afficher "ARROSAGE".
      `);
      return;
    }

    helper.success(`
    Bravo ! Le système d'arrosage semble être de retour en ligne, ainsi que le
    pont sud.
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
