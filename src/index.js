import repl from 'repl';
import ShellApi from './ShellApi.js';
import Mapper from './Mapper.js';
import CLIServiceProvider from './CLIServiceProvider.js';
import { MongoClient } from 'mongodb';
const URI = 'mongodb://localhost:27017';

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

const myRepl = repl.start({ prompt: '> '});
const originalEval = myRepl.eval;
myRepl.eval = customEval;

const client = new MongoClient(URI, {useNewUrlParser: true, useUnifiedTopology: true});
async function connect() {
  return await client.connect();
}
connect();

const ServiceProvider = new CLIServiceProvider(myRepl.context, client);
const mapper = new Mapper(myRepl.context, ServiceProvider);
const myShellApi = new ShellApi(mapper);
Object.keys(myShellApi).filter(k => (!k.startsWith('_'))).forEach(k => (myRepl.context[k] = myShellApi[k]));

function finish(err, res, cb) {
  Promise.resolve(res).then((result) => {
    cb(null, result);
  }).catch((error) => {
    cb(error, null);
  });
}

function customEval(input, context, filename, callback) {
    const argv = input.trim().split(' ');
    const cmd = argv[0];
    argv.shift();
    switch(cmd) {
      case 'help':
        myShellApi.help;
        return callback(null, myShellApi.help);
      case 'use':
        return callback(null, myShellApi.use(argv[0]));
      default:
        originalEval(input, context, filename, (err, res) => { finish(err, res, callback) });
    }
}
