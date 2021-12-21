const path = require("path");
const esprima = require("esprima");
const { spawn } = require("child_process");
const { remote } = require("electron");
const jetpack = require("fs-jetpack");
const v4 = require("uuid");

const appDataPath = path.resolve(remote.app.getPath("appData"), "TwilioQuest");
const codeStoragePath = path.join(appDataPath, "QuestIDE");

// Create a directory to house our javascript code validator
const javascriptValidatorPath = path.join(appDataPath, "javascript_validator");
const javascriptValidatorCodePath = path.join(
  javascriptValidatorPath,
  "validate.js"
);
jetpack.dir(javascriptValidatorPath);

// An error wrapper we can assume to have a nice human readable error message
class NiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "NiceError";
  }
}

// Get path to user code for an objective
function getCodePath(objectiveName) {
  return path.join(
    codeStoragePath,
    "javascript",
    objectiveName,
    "user_code.js"
  );
}

// Get user code for an objective as a string
async function getCode(objectiveName) {
  const savedCodePath = getCodePath(objectiveName);

  const exists = await jetpack.existsAsync(savedCodePath);
  if (!exists) {
    throw new NiceError(`
    Nous n'avons pas pu trouver votre code sauvegardé - veuillez ouvrir 
    l'éditeur et assurez vous que que votre code y a été créé.
    `);
  }

  return await jetpack.readAsync(savedCodePath);
}

// Get pre-analyzed user code
async function getAnalyzedCode(objectiveName) {
  const userCode = await getCode(objectiveName);

  try {
    const program = esprima.parseScript(userCode);
    return { userCode, program };
  } catch (e) {
    // This means there's an error parsing the code
    let message = `
    Il semble qu'il y ait une erreur dans votre code.
    `;
    if (e.lineNumber) {
      message += `
      Vérifier sur la
      <strong style="color:yellow">ligne ${e.lineNumber}</strong>. L'erreur
      est la suivante : <br/><br/>
      ${e.description}
      `;
    } else {
      message += `
      Vérifiez l'absence d'erreurs dans votre code dans l'éditeur
      - en voyez-vous dans la console lorsque vous essayez d'exécuter votre code ?
      `;
    }
    throw new NiceError(message);
  }
}

// Execute the given chunk of validation JavaScript code
async function executeCodeString(node, code, args = []) {
  await jetpack.writeAsync(javascriptValidatorCodePath, code);

  return new Promise(async (resolve, reject) => {
    const process = spawn(node, [javascriptValidatorCodePath].concat(args));
    let finished = false;
    let bufferedStdout = "";
    let bufferedStderr = "";

    process.on("error", (e) => {
      reject(
        new NiceError(`
        Il y a eu un problème de validation de votre code JavaScript. Veuillez réessayer.
      `)
      );
    });

    process.stdout.on("data", (data) => {
      bufferedStdout += `${data}`;
    });

    process.stderr.on("data", (data) => {
      bufferedStderr += `${data}`;
    });

    process.on("close", (code) => {
      finished = true;

      // We don't care about success or failure - let the validation code sort
      // that out
      resolve({
        exitCode: code,
        stdout: bufferedStdout,
        stderr: bufferedStderr,
      });
    });

    setTimeout(() => {
      if (!finished) {
        console.warn("Le code de validation de Node.js a expiré.");
        reject(
          new NiceError(`
          Il y a eu un problème de validation de votre code Node.js - veuillez réessayer.
        `)
        );
      }
    }, 5000);
  });
}

function throwAssertionError(message) {
  const assertionError = new Error(message);
  assertionError.name = "AssertionError";

  throw assertionError;
}

function doesFunctionExist(functionName) {
  try {
    eval(functionName);
  } catch (err) {
    throwAssertionError(`La fonction "${functionName}" n'existe pas !`);
  }
}

function expectFunctionResultToBe(
  functionName,
  expectedValue,
  parameters = [],
  customErrorMessage
) {
  doesFunctionExist(functionName);

  const functionUnderTest = eval(functionName);

  const actualValue = functionUnderTest(...parameters);

  console.log(expectedValue, actualValue);

  let comparisonFn;

  if (Array.isArray(expectedValue)) {
    if (!Array.isArray(actualValue)) {
      const errorMessage = `"${functionName}" n'a pas retourné un tableau comme prévu !`;

      throwAssertionError(errorMessage);
    }

    // check array contents comparison, with order respected
    comparisonFn = (expected, actual) =>
      expected.every((val, index) => actual[index] === val);
  } else {
    // basic equality comparisonFn
    comparisonFn = (expected, actual) => expected === actual;
  }

  if (!comparisonFn(expectedValue, actualValue)) {
    const errorMessage =
      customErrorMessage ||
      `"${functionName}" a renvoyé "${actualValue}" au lieu de la valeur attendue "${expectedValue}" lorsqu'il a été appelé avec les paramètres : ${parameters}.`;

    throwAssertionError(errorMessage);
  }
}

async function evaluteAssertions(helper, fileName, assertionsString) {
  const { TQ_NODE_EXE, TQ_JAVASCRIPT_WORKSPACE_PATH } = helper.env;
  const programPath = path.join(TQ_JAVASCRIPT_WORKSPACE_PATH, fileName);

  const exists = await jetpack.existsAsync(programPath);
  if (!exists) {
    helper.fail(
      `Nous n'avons pas trouvé votre script "${fileName}" dans votre espace de travail JavaScript. Le fichier "${programPath}" existe-t-il ?`
    );
    return false;
  }

  const VALIDATION_UUID = v4();

  const VALIDATION_CODE = `
    ${throwAssertionError.toString()}
    ${doesFunctionExist.toString()}
    ${expectFunctionResultToBe.toString()}

    ${assertionsString}
    console.log('${VALIDATION_UUID}');
  `;

  const userCode = await jetpack.readAsync(programPath);
  const testCode = `${userCode}\n\n${VALIDATION_CODE}`;

  const { stdout, stderr } = await executeCodeString(TQ_NODE_EXE, testCode);

  if (stderr.includes("AssertionError")) {
    const [, errorMessage] = stderr.match(/.AssertionError.: (.*)/);

    helper.fail(`
      ${errorMessage}
    `);
    return false;
  }

  if (stderr) {
    const [, errorMessage] = stderr.match(/Error: (.*)/);
    helper.fail(`
    Une erreur inattendue s'est produite !
      
      "${errorMessage}"
    `);
    return false;
  }

  if (!stdout.includes(VALIDATION_UUID)) {
    helper.fail(`
    Le script de validation n'a pas pu terminer avec succès et a émis l'UUID de validation : "${VALIDATION_UUID}".
    `);
    return false;
  }

  return true;
}

// Helper to write script output to a file
async function writeFile(codePath, fileName, args, output) {
  const p = path.dirname(codePath);
  const t = path.join(p, fileName);
  const text =
    `Exécution du script: ${codePath}\n` +
    `Arguments: ${args}\n` +
    `Sortie:\n${output}\n`;
  await jetpack.writeAsync(t, text);
}

// Export public interface
module.exports = {
  NiceError,
  getCodePath,
  getCode,
  getAnalyzedCode,
  executeCodeString,
  throwAssertionError,
  doesFunctionExist,
  expectFunctionResultToBe,
  evaluteAssertions,
};
