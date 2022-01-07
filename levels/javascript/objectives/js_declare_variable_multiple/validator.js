const vm = require('vm');
const path = require('path');
const jetpack = require('fs-jetpack');

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH, 
      'chestConfiguration.js'
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "chestConfiguration.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
    `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);
    const scriptContext = { __TQ: {} };
    const testCode = `
      ${userCode};
      
      try {
        __TQ.accessLevel = accessLevel;
        __TQ.favoriteRobot = favoriteRobot;
        __TQ.verifiedUser = verifiedUser;
      } catch(e) {
        __TQ.error = e;
      }
    `;

    // First, execute user code to ensure it runs unchanged
    let script = new vm.Script(userCode);
    script.runInNewContext();

    // Assuming that it doesn't throw, we can try running it with our test
    // code appended to it.
    script = new vm.Script(testCode);
    script.runInNewContext(scriptContext);

    // Inspect the script context for the stuff we want
    const tq = scriptContext.__TQ;
    if (tq.error) {
      console.log(tq.error);
      if (tq.error.name === 'ReferenceError') {
        const { message } = tq.error;

        let missingVariable = 'accessLevel';
        if (message.includes('favoriteRobot')) {
          missingVariable = 'favoriteRobot';
        } else if (message.includes('verifiedUser')) {
          missingVariable = 'verifiedUser';
        }

        return helper.fail(`
        Il semble qu'une variable <span class="highlight">${missingVariable}</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la variable 
        "<span class="highlight">${missingVariable}</span>" ?
        Vous pourriez peut-être vérifier votre orthographe ?
      `);
      } else {
        return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
          <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check variable types, and provide appropriate feedback
    if (typeof tq.accessLevel !== 'number') {
      let message = `
      Nous avons trouvé votre variable <span class="highlight">accessLevel</span>, mais
      ce n'était pas un objet Nombre comme nous le pensions. Il semble qu'il s'agisse en fait d'un objet
      <span class="highlight">${typeof tq.accessLevel}</span>.
    ` ;

    if (typeof tq.accessLevel === 'string') {
      message += `<br/><br/>.
        Il semble que vous ayez créé accidentellement une chaîne de caractères pour cette variable.
        comme les nombres et les booléens ne sont pas entourés de guillemets dans votre code.
        Consultez la section Aide pour un exemple de déclaration de variables numériques.
      ` ;
    }

    return helper.fail(message) ;
  }

  if (typeof tq.verifiedUser !== 'boolean') {
    let message = `
      Nous avons trouvé votre <span class="highlight">verifiedUser</span> variable, mais
      ce n'était pas un objet booléen comme nous le pensions. Il semble qu'il s'agisse en fait d'un objet
      <span class="highlight">${typeof tq.verifiedUser}</span>.
    ` ;

    if (typeof tq.verifiedUser === 'string') {
      message += `<br/><br/>.
        Il semble que vous ayez créé accidentellement une chaîne de caractères pour cette variable.
        comme les nombres et les booléens ne sont pas entourés de guillemets dans votre code.
        Consultez la section Aide pour obtenir un exemple de déclaration de variables booléennes.
      ` ;
    }

    return helper.fail(message) ;
  }

  if (typeof tq.favoriteRobot !== 'string') {
    let message = `
      Nous avons trouvé la variable <span class="highlight">favoriteRobot</span>, 
      mais il ne s'agit pas d'un objet String comme prévu.
      Il semble qu'il s'agisse en fait d'un objet
      <span class="highlight">${typeof tq.favoriteRobot}</span>.
    ` ;

    return helper.fail(message) ;
  }

    // Check variable values, now that we know they exist
    if (tq.accessLevel !== 7) {
      return helper.fail(`
      Nous avons trouvé votre variable <span class="highlight">accessLevel</span>, mais
      elle n'était pas définie sur le nombre <span class="highlight">7</span> comme nous le pensions.
      Il semble qu'elle ait été définie à 
      <span class="highlight">${tq.accessLevel}</span>.
    `) ;
  }

  if (tq.favoriteRobot !== 'Cedric') {
    return helper.fail(`
      Nous avons trouvé votre variable <span class="highlight">favoriteRobot</span>, mais
      elle n'était pas définie à la chaîne <span class="highlight">"Cedric"</span> comme nous l'attendions.
      Il semble qu'elle ait été définie à 
      <span class="highlight">"${tq.favoriteRobot}"</span>.
    `) ;
  }

  if (tq.verifiedUser !== true) {
    return helper.fail(`
      Nous avons trouvé votre <span class="highlight">verifiedUser</span> variable, mais
      elle n'était pas définie à la valeur booléenne <span class="highlight">true</span>
      comme prévu. Il semble qu'elle ait été définie à 
      <span class="highlight">${tq.verifiedUser}</span>.
    `) ;
  }

  helper.success(`)
    Bien joué ! Votre surcharge de configuration a fonctionné, et vous avez maintenant accès aux
    fournitures dans le coffre.
  `) ;
} catch (e) {
  helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez. Voici l'erreur 
    erreur que nous avons trouvé: <br/><br/>
    <span class="highlight">${e}</span>
  `) ;
}
} ;
