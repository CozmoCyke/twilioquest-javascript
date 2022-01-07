const vm = require('vm');
const path = require('path');
const jetpack = require('fs-jetpack');

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH, 
      'laserConfiguration.js'
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "laserConfiguration.js" dans votre 
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
        __TQ.laserStatus = laserStatus;
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
        return helper.fail(`
        Il semble qu'une <span class="highlight">laserStatus</span> 
        n'a pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la variable 
        "<span class="highlight">laserStatus</span>" ? Peut-être que vous devriez revérifier votre
        orthographe ?
      `) ;
    } else {
      return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
        <br/><br/>
        ${tq.error}
      `) ;
    }
  }

    // Check for the correct value of the string
    if (tq.laserStatus !== 'OFF') {
      return helper.fail(`
      Vous avez déclaré la variable <span class="highlight">laserStatus</span>,
      mais elle n'a pas été définie à la valeur de chaîne de caractères "OFF". Consultez la section Aide
      pour savoir comment vous pouvez déclarer des variables de type chaîne. La valeur que vous avez définie était : <strong>"${tq.laserStatus}"</strong>.
    `) ;
  }

  helper.success(`)
    Vous avez réussi ! Vous surchargez la configuration du laser avec votre propre code JavaScript. 
    et en quelques instants les lasers s'éteignent. <br/><br/>
    Vous pouvez maintenant poursuivre votre route vers le bureau.
  `) ;
} catch (e) {
  helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous
    pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez. 
    Voici l'erreur que nous avons trouvée : <br/><br/>
    <span class="highlight">${e}</span>
    `);
  }
};
