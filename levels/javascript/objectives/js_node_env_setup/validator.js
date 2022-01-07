const { spawn } = require('child_process');

module.exports = async helper => {
  try {
    const { nodePath } = helper.validationFields;

    const args = ['--version'];
    const [isExecutableValid, errorMessage] = await helper.isExecutableValid(
      nodePath,
      args
    );

    if (!isExecutableValid) {
      helper.fail(errorMessage);
      return;
    }

    const nodeVersion = spawn(nodePath, args);
    let versionString = '';
    nodeVersion.stdout.on('data', data => {
      versionString += `${data}`;
    });

    nodeVersion.on('close', code => {
      if (code === 0) {
        helper.success(
          `
          Génial ! On dirait que vous avez installé cette version : <br/>
          <span class="highlight">${versionString}</span> <br/><br/>
          Veuillez passer au prochain point de contrôle de sécurité.
        `,
          [{ name: 'NODE_EXE', value: nodePath }]
        );
      } else {
        helper.fail(`
        Eh bien ... quelque chose s'est mal passé lorsque nous avons essayé 
        de valider ce chemin Node.js. Vérifiez à nouveau le chemin et essayez à nouveau.
        `);
      }
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'NiceError') {
      helper.fail(e.message);
    } else {
      helper.fail(`
      Désolé ! Nous n'avons pas pu valider votre installation Node.js. Veuillez réessayer
      à nouveau.
      `);
    }
  }
};
