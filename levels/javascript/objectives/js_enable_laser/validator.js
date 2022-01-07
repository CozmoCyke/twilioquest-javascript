module.exports = async (helper) => {
  try {
    const { laserPassword } = helper.validationFields;
    const { TQ_JAVASCRIPT_WORLD_STATE } = helper.context.levelState;

    // The player needs to find the password first
    if (!TQ_JAVASCRIPT_WORLD_STATE.room1.passwordFound) {
      return helper.fail(`
      Vous ne pouvez pas redémarrer le laser sans le bon mot de passe. Parlez au
      scientifique en chef pour réussir à obtenir le mot de passe dont vous avez besoin !
      `);
    }

    if (!laserPassword || laserPassword.trim() !== "PEW PEW PEW!") {
      return helper.fail(`
      Mot de passe incorrect. Quand vous avez trouvé le mot de passe sur le bureau du scientifique,
      c'était : <strong>PEW PEW PEW!</strong>
      `);
    }

    helper.success(`
    Succès ! Le rayon de stase se met en marche, et l'expérience commence ! 
    Attendez... c'est quoi ce grondement ?
    `);
  } catch (e) {
    helper.fail(`
    Il y a eu une erreur dans le traitement du mot de passe.
    `);
  }
};
