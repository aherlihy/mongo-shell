import repl from 'repl';
import ShellApi from './ShellApi.js';
import CLIServiceProvider from './CLIServiceProvider.js';

// Color functions
const COLORS = { RED: "31", GREEN: "32", YELLOW: "33", BLUE: "34", MAGENTA: "35" };
const colorize = (color, s) => `\x1b[${color}m${s}\x1b[0m`;

// Example of colorize
const user = colorize(COLORS.MAGENTA, process.env.USER);
const cwd = colorize(COLORS.YELLOW, process.cwd());
const say = message => () => console.log(message);

const sayWelcome = say(`
  Hello, ${user}! Welcome to the mongodb shell 2.0 ${cwd}.
`);

// Print the welcome message
sayWelcome();

// TODO: try to turn on repl await
process.env.NODE_OPTIONS = '--experimental-repl-await';
console.log(`process env =${process.env.NODE_OPTIONS}`);

const myRepl = repl.start({ prompt: '> '});
const originalEval = myRepl.eval;
myRepl.eval = myEval;


const ServiceProvider = new CLIServiceProvider(myRepl.context);
const myShellApi = new ShellApi(myRepl.context, ServiceProvider);
Object.keys(myShellApi).filter(k => (!k.startsWith('_'))).forEach(k => (myRepl.context[k] = myShellApi[k]));


function myEval(input, context, filename, callback) {
    const argv = input.trim().split(' ');
    const cmd = argv[0];
    argv.shift();
    switch(cmd) {
      case 'help':
        return myShellApi._help(callback, ...argv);
      case 'use':
        return myShellApi._use(callback, ...argv);
      case 'public':
        return myShellApi._updatePublicVar(callback, ...argv);
      case 'private':
        return myShellApi._updatePrivateVar(callback, ...argv);
      default:
        originalEval(input, context, filename, callback);
      // originalEval(`await ${input}`, context, filename, callback);
    }
}
