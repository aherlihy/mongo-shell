const repl = require('repl');

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
