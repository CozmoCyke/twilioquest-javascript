const commandExists = require('command-exists');
const path = require('path');
const jetpack = require('fs-jetpack');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async helper => {
  try {
    const { TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;

    try {
      await commandExists('git');
    } catch (err) {
      helper.fail(`
      Nous avons essayé de trouver une installation locale de "git" sur votre ordinateur, mais nous n'avons pas pu !

        ${err}
      `);
      return;
    }

    const gitDirPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, '.git');
    const gitRepoExists = await jetpack.existsAsync(gitDirPath);

    if (gitRepoExists !== 'dir') {
      helper.fail(
        `Nous n'avons pas trouvé de répertoire .git dans le répertoire de votre espace de travail JavaScript! -> ${gitDirPath}`
      );
      return;
    }

    const gitStatus = await exec(`git status`, {
      cwd: TQ_JAVASCRIPT_WORKSPACE_PATH,
    });

    const status = gitStatus.stdout;

    if (status.includes('No commits yet')) {
      helper.fail(`
      Il semble que votre dépôt git n'a pas encore de commit initial. Ajoutez tous les fichiers dans votre répertoire avec "git add -A" et ensuite commitez-les avec "git commit".
      `);
      return;
    }

    helper.success(`
    Vous avez réussi à créer et à activer un dépôt git pour votre espace de travail JavaScript. Assurez-vous de continuer à commiter votre travail au fur et à mesure afin de pouvoir le consulter !
    `);
  } catch (e) {
    helper.fail(`
    Quelque chose n'a pas fonctionné lorsque nous avons essayé de valider l'existence de votre dépôt git !

      ${e}
    `);
  }
};
