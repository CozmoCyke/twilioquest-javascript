const path = require("path");
const jetpack = require("fs-jetpack");
const {
  executeCodeString,
} = require("../../../../scripts/objectiveValidation");

function correctDecrypt(number) {
  let output = "";

  if (number % 3 === 0) {
    output += "Java";
  }

  if (number % 5 === 0) {
    output += "Script";
  }

  if (!output) {
    output = String(number);
  }

  return output;
}

module.exports = async (helper) => {
  try {
    const { TQ_NODE_EXE, TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, "fizzBuzz.js");

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "fizzBuzz.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);
    const testNumbers = [4, 24, 25, 30];
    let results = [];

    for (let i = 0, l = testNumbers.length; i < l; i++) {
      let result = await executeCodeString(
        TQ_NODE_EXE, userCode, [testNumbers[i]]
      );
      let n = result.stdout ? result.stdout.trim() : "";
      results.push(n);
    }

    /*
    const promises = testNumbers.map(async (num) => {
      let result = await executeCodeString(TQ_NODE_EXE, userCode, [num]);
      return result.stdout ? result.stdout.trim() : "";
    });
    const results = await Promise.all(promises);
    */

    // Process results against solution
    for (let i = 0, l = results.length; i < l; i++) {
      let result = results[i];
      let correct = correctDecrypt(testNumbers[i]);
      if (result !== correct) {
        return helper.fail(`
        En testant votre script, nous avons passé "${i}" mais
        avons trouvé  "${result}" au lieu de "${correct}". Veuillez tester à nouveau votre script.
        `);
      }
    }

    helper.success(`
    Vous avez réussi ! Aucune absurdité d'entretien d'embauche ne peut vous tromper.
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
