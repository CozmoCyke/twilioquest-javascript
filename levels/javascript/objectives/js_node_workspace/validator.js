const jetpack = require("fs-jetpack");
const { NiceError } = require("../../../../scripts/objectiveValidation");

module.exports = async (helper) => {
  try {
    const { workspacePath } = helper.validationFields;

    if (!workspacePath) {
      throw new NiceError(`
      Veuillez fournir un chemin vers le répertoire de votre espace de travail Node.js !
      `);
    }

    const exists = await jetpack.existsAsync(workspacePath);
    if (!exists) {
      throw new NiceError(`
      Nous n'avons pas pu trouver de répertoire au chemin que vous avez fourni. 
      Veuillez vérifier que le chemin d'accès au répertoire que vous avez collé 
      dans le champ de texte est correct.
      `);
    }

    helper.success(
      `
      Espace de travail JavaScript confirmé. Accès au laboratoire accordé - veuillez passer
      par la porte de sécurité.
    `,
      [
        {
          name: "JAVASCRIPT_WORKSPACE_PATH",
          value: workspacePath,
        },
      ]
    );
  } catch (e) {
    console.log(e);
    if (e.name === "NiceError") {
      helper.fail(e.message);
    } else {
      helper.fail(`
      Désolé ! Nous n'avons pas réussi à trouver le chemin de votre espace de travail Node.js.
      `);
    }
  }
};
