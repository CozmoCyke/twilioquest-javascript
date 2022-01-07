const vm = require('vm');
const path = require('path');
const jetpack = require('fs-jetpack');

const isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH, 
      'politeLasers.js'
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "politeLasers.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);
    const scriptContext = {
      process: process,
      __TQ: {} 
    };
    const testCode = `
      ${userCode};
      
      try {
        __TQ.getLaserSetting = getLaserSetting;
      } catch(e) {
        __TQ.error = e;
      }
    `;

    // First, execute user code to ensure it runs unchanged
    let script = new vm.Script(userCode);
    script.runInNewContext(Object.assign({}, scriptContext));

    // Assuming that it doesn't throw, we can try running it with our test
    // code appended to it.
    script = new vm.Script(testCode);
    script.runInNewContext(scriptContext);

    // Inspect the script context for the stuff we want
    const tq = scriptContext.__TQ;

    if (tq.error) {
      console.log(tq.error);
      if (tq.error.name === 'ReferenceError') {
        return helper.fail(`
        Il semble qu'une fonction <span class="highlight">getLaserSetting</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la fonction 
        "<span class="highlight">getLaserSetting</span>" ? Peut-être que vous pouvez revérifier votre orthographe ?
      `);
      } else {
        return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
        <br/><br/>
          ${tq.error}
        `);
      }
    }

    // Check type of the function
    if (!isFunction(tq.getLaserSetting)) {
      let message = `
      Nous avons trouvé une variable appelée 
      <span class="highlight">getLaserSetting</span>, mais ce n'est pas une
      fonction appelable. Consultez la section Aide pour obtenir plus de conseils sur la création d'une fonction JavaScript.
      `;

      return helper.fail(message);
    }

    // Check functionality
    try {
      const result = tq.getLaserSetting(1);
      const result2 = tq.getLaserSetting('now!');
      const result3 = tq.getLaserSetting('please');

      if (result === undefined || result === null) {
        return helper.fail(`
        Il semble que votre fonction ne renvoie pas encore de valeur. La dernière
        ligne de code de votre fonction avant le "}" doit utiliser le mot-clé
        <span class="highlight">return</span> pour renvoyer une valeur quelconque à la suite de l'exécution de la fonction. Voir l'exemple de code
        dans la section d'Aide.
        `);
      }

      if (typeof result !== 'string') {
        return helper.fail(`
        Il semble que votre fonction ne renvoie pas une chaîne de caractères. Votre fonction
        fonction doit renvoyer une chaîne de caractères avec la valeur
        <span class="highlight">"OFF"</span>.
      `) ;
    }

    if (result !== 'ON') {
      return helper.fail(`
        Votre fonction a renvoyé une chaîne de caractères, mais pas la valeur que nous recherchions. Votre fonction renvoie la valeur 
        <span class="highlight">"${result}"</span>. La valeur correcte est
        <span class="highlight">"ON"</span>.
      `) ;
    }

    if (result2 !== 'ON') {
      return helper.fail(`
        Votre fonction a renvoyé une chaîne de caractères, mais pas la valeur que nous recherchions recherchée. Votre fonction renvoie la valeur 
        <span class="highlight">"${result}"</span>. La valeur correcte est
        <span class="highlight">"ON"</span>.
      `) ;
    }

    if (result3 !== 'OFF') {
      return helper.fail(`
        Lorsqu'on passe à votre fonction la chaîne "please", elle doit renvoyer la chaîne "OFF".
        la chaîne "OFF".
      `) ;
    }

  } catch(ee) {
    return helper.fail(`
      Une erreur s'est produite lors de l'exécution de votre fonction getLaserSetting. Veuillez assurez-vous que vous pouvez exécuter votre fonction à partir de la ligne de commande 
      avec succès et réessayez. Utilisez le code de démarrage dans la section d'aide si
      vous êtes bloqué. Voici l'erreur que nous avons trouvé en essayant d'appeler votre 
      fonction : <br/><br/>
      <span class="highlight">${ee}</span>
    `) ;
  }

  helper.success(`
    Avec un gros soupir, vous avez une fois de plus apaisé Glen et créé une fonction qui
    fait tomber la barrière laser lorsqu'on le lui demande poliment. Vous pouvez maintenant aller plus loin dans
    le labo.
  `) ;
} catch (e) {
  helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez. Voici l'erreur 
    que nous avons trouvée : <br/><br/>
    <span class="highlight">${e}</span>
    `);
  }
};
