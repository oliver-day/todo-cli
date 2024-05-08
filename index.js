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
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import alert from "cli-alerts";
import chalk from "chalk";

import init from "./utils/init.js";
import cli from "./utils/cli.js";
import log from "./utils/log.js";
import ask from "./utils/ask.js";
import select from "./utils/select.js";
import to from "await-to-js";

// Database
const dbTodos = path.join(process.cwd(), ".todo/todos.json");

const { input, flags } = cli;
const { clear, debug } = flags;
const { green, red, yellow } = chalk;

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);

  if (!fs.existsSync(dbTodos)) {
    await makeDirectory(".todo");
    process.chdir(".todo");
    fs.writeFileSync(dbTodos, `{}`);
  }

  const defaultData = {
    todos: [],
  };
  const db = new LowSync(new JSONFileSync(dbTodos), defaultData);
  db.read();

  // COMMAND: todo view OR todo ls
  if (
    input.includes("view") ||
    input.includes("list") ||
    input.includes("ls")
  ) {
    const allTodos = db.data.todos;
    allTodos.map((todo, index) => {
      console.log(`${chalk.dim(`${++index}`)}: ${todo.title}`);
    });
    console.log(
      `\n${chalk.hex(`#fad000`).inverse(" TOTAL ")}  ${allTodos.length}\n`
    );
  }

  // COMMAND: todo add
  if (input.includes("add")) {
    const newTodo = await ask({ message: "Add a todo?" });
    db.update(({ todos }) => todos.push({ title: newTodo }));
    alert({ type: `success`, msg: `successfully!`, name: "ADDED" });
  }

  // COMMAND: todo delete
  if (
    input.includes("delete") ||
    input.includes("del") ||
    input.includes("remove") ||
    input.includes("rm")
  ) {
    const allTodos = db.data.todos;
    const todosToDelete = await select({
      message: "Mark todos as completed: ",
      choices: allTodos,
    });
    db.data.todos = allTodos.filter(
      (todo) => !todosToDelete.includes(todo.title)
    );
    db.write();
    alert({
      type: `success`,
      msg: `${todosToDelete.length} todos`,
      name: "COMPLETED",
    });
  }

  debug && log(flags);
})();
