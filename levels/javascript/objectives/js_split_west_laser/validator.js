const vm = require("vm");
const path = require("path");
const jetpack = require("fs-jetpack");

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function isClassDeclaration(obj) {
  return isFunction(obj) && obj.toString && obj.toString().includes("class");
}

module.exports = async (helper) => {
  const { TQ_JAVASCRIPT_WORLD_STATE } = helper.context.levelState;
  const isObjectiveReady =
    TQ_JAVASCRIPT_WORLD_STATE.beamTwoOnline &&
    TQ_JAVASCRIPT_WORLD_STATE.beamThreeOnline &&
    TQ_JAVASCRIPT_WORLD_STATE.beamFourOnline;

  // The player needs to enable the other beams first
  if (!isObjectiveReady) {
    return helper.fail(`
    Vous ne pouvez pas redémarrer ce laser tant que les trois autres rayons ne sont pas activés.
    Voir l'onglet objectif pour plus d'informations.
  `);
  }

  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
    const programPath = path.join(
      TQ_JAVASCRIPT_WORKSPACE_PATH,
      "ducktypium.js"
    );

    const exists = await jetpack.existsAsync(programPath);
    if (!exists) {
      helper.fail(`
      Nous n'avons pas pu trouver votre script "ducktypium.js" dans votre 
      dossier de code JavaScript. Le fichier ci-dessous existe-t-il ? <br/><br/>
      <span style="word-wrap:break-word">${programPath}</span>
      `);
      return;
    }

    const userCode = await jetpack.readAsync(programPath);
    const scriptContext = {
      process: process,
      __TQ: {},
    };
    const testCode = `
      ${userCode};
      
      try {
        __TQ.Ducktypium = Ducktypium;
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
      if (tq.error.name === "ReferenceError") {
        return helper.fail(`
        Il semble qu'une classe <span class="highlight">Ducktypium</span> n'ait pas été définie dans votre
        code. Du moins, nous ne l'avons pas vue dans la portée globale de votre script.
        <br/><br/>
        Avez-vous nommé la classe 
        "<span class="highlight">Ducktypium</span>" ? Vous pourriez peut-être vérifier votre orthographe ?
      `) ;
    } else {
      return helper.fail(`
        Il y a eu un problème de validation de votre code. L'erreur trouvée est la suivante :
        <br/><br/>
        ${tq.error}
      `) ;
    }
  }

  // Vérifier le type de la fonction
  if (!isClassDeclaration(tq.Ducktypium)) {
    let message = `
      Nous avons trouvé une variable appelée 
      <span class="highlight">Ducktypium</span>, mais ce n'est pas une
      classe. Consultez la section Aide pour obtenir plus de conseils sur la création
      d'une classe JavaScript.
    ` ;

    return helper.fail(message) ;
  }

  // Vérifiez la fonctionnalité
  try {
    // Assurez-vous d'abord qu'il se trompe en cas d'entrée incorrecte.
    try {
      const badColor = new tq.Ducktypium("mauve") ;

      // Si nous parvenons à ce stade, il s'agit en fait d'un échec.
      return helper.fail(`
        Votre constructeur ne doit accepter que les arguments " red ", " yellow " ou " blue ".
        comme arguments.
      `) ;
    } catch (colorError) {
      // C'est en fait ce que nous voulons, alors continuez...
    }

    // Créez une instance de test
    const dt = new tq.Ducktypium("blue") ;

    if (dt.color !== "blue") {
      return helper.fail(`
        Votre constructeur doit définir la propriété "color" de la nouvelle instance de
        instance de Ducktypium au premier argument du constructeur.
      `) ;
    }

    if (!dt.calibrationSequence || dt.calibrationSequence.length !== 0) {
      return helper.fail(`
        Votre constructeur doit définir la propriété "calibrationSequence" de la nouvelle instance de Ducktypium sur un tableau vide.
      `) ;
    }

    // Assurez-vous que les fonctions sont définies
    if (!dt.refract || !isFunction(dt.refract)) {
      return helper.fail(`)
        Votre objet Ducktypium ne possède pas de méthode d'instance "refract".
      `) ;
    }

    if (!dt.calibrate || !isFunction(dt.calibrate)) {
      return helper.fail(`
        Votre objet Ducktypium ne possède pas de méthode d'instance "calibrate".
      `) ;
    }

    // Vérifiez la fonctionnalité des méthodes
    if (dt.refract("blue") !== "blue") {
      return helper.fail(`
        La méthode refract devrait renvoyer la propriété de couleur de l'objet Ducktypium si la même couleur est passée à la méthode.
      `) ;
    }

    if (dt.refract("yellow") !== "green") {
      return helper.fail(`
        La méthode refract doit réussir à renvoyer la couleur que l'on obtient lorsque sa propriété "color"
        est combinée avec une autre couleur primaire.Voir les combinaisons de couleurs dans l'onglet "Objectif". 
      `) ;
    }

    dt.color = "red" ;
    if (dt.refract("yellow") !== "orange") {
      return helper.fail(`
        La méthode refract doit renvoyer la couleur que vous obtenez lorsque sa propriété "color" est combinée avec une autre couleur primaire. Voir les combinaisons de couleurs dans l'onglet "Objectif".
      `) ;
    }

    dt.color = "yellow" ;
    if (dt.refract("blue") !== "green") {
      return helper.fail(`
        La méthode de réfraction doit renvoyer la couleur que l'on réussit à obtenir lorsque la propriété "color" est combinée avec une autre couleur primaire.
        est combinée avec une autre couleur primaire. Voir les
        combinaisons de couleurs dans l'onglet "Objectif".
      `) ;
   
    }

    dt.color = "red" ;
    if (dt.refract("yellow") !== "orange") {
      return helper.fail(`
        La méthode refract doit renvoyer la couleur que vous obtenez lorsque sa propriété "color" est combinée avec une autre couleur primaire. Voir les combinaisons de couleurs dans l'onglet "Objectif".
      `) ;
    }

    dt.color = "yellow" ;
    if (dt.refract("blue") !== "green") {
      return helper.fail(`
        La méthode refract doit réussir à renvoyer la couleur que vous obtenez lorsque sa propriété "color" est combinée avec une autre couleur primaire. Voir les combinaisons de couleurs dans l'onglet "Objectif". 
      `) ;
    }

    dt.calibrate([10, 20, 1]) ;

    if (
      dt.calibrationSequence[0] !== 3 ||
      dt.calibrationSequence[1] !== 30 ||
      dt.calibrationSequence[2] !== 60
    ) {
      return helper.fail(`
        La méthode d'étalonnage doit définir la propriété "calibrationSequence" de l'instance de Ducktypium à un tableau comme décrit dans l'onglet objectif.
      `) ;
    }
  } catch (ee) {
    console.log(ee) ;
    return helper.fail(`
      Une erreur s'est produite lors de l'exécution de votre constructeur ou de vos fonctions Ducktypium. 
      Veuillez vous assurer que vous pouvez exécuter votre fonction à partir de la ligne de commande avec succès et réessayez. Utilisez le code de démarrage dans la section Aide si vous êtes bloqué. Voici l'erreur que nous avons trouvé en essayant d'appeler votre fonction
      fonction : <br/><br/>
      <span class="highlight">${ee}</span>
    `) ;
  }

  helper.success(`
    Le laser final s'allume ! Vous pouvez sentir la réalité se plier et se tordre autour de vous, et l'obscurité s'insinue aux coins de vos yeux pour brouiller votre vision. Dans un instant, l'obscurité s'estompe, et vous regardez autour de vous...
  `) ;
} catch (e) {
  helper.fail(`
    Une erreur s'est produite lors de l'exécution de votre code JavaScript. Veuillez vous assurer que vous pouvez l'exécuter avec succès à partir de la ligne de commande et réessayez. Voici l'erreur que nous avons trouvé : <br/><br/>
    <span class="highlight">${e}</span>
  `) ;
}
} ;
