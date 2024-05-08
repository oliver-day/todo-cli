import meow from "meow";
import meowHelp from "cli-meow-help";

const flags = {
  clear: {
    type: `boolean`,
    default: true,
    alias: `c`,
    desc: `Clear the console`,
  },
  noClear: {
    type: `boolean`,
    default: false,
    desc: `Don't clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
};

const commands = {
  add: { desc: `Add a new todo` },
  view: { desc: `View or list all todos` },
  list: { desc: `View or list all todos` },
  ls: { desc: `View or list all todos` },
  delete: { desc: `Delete completed todos` },
  del: { desc: `Delete completed todos` },
  remove: { desc: `Delete completed todos` },
  rm: { desc: `Delete completed todos` },
  help: { desc: `Print help info` },
};

const helpText = meowHelp({
  name: `todo`,
  flags,
  commands,
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

export default meow(helpText, options);
