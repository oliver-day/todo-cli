#!/usr/bin/env node

/**
 * cli-todo
 * CLI to manage todos in a directory
 *
 * @author Oliver Day <test>
 */

import fs from "fs";
import path from "path";
import { makeDirectory } from "make-dir";

import init from "./utils/init.js";
import cli from "./utils/cli.js";
import log from "./utils/log.js";

// Database
const dbTodos = path.join(process.cwd(), ".todo/todos.json");

const { input, flags } = cli;
const { clear, debug } = flags;

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);

  if (!fs.existsSync(dbTodos)) {
    await makeDirectory(".todo");
    process.chdir(".todo");
    fs.writeFileSync(dbTodos, `{}`);
  }

  debug && log(flags);
})();
