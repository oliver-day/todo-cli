import enquirer from "enquirer";
import { to } from "await-to-js";
import shouldCliCancel from "cli-should-cancel";
import handleCliError from "cli-handle-error";
import chalk from "chalk";

const { MultiSelect } = enquirer;

export default async function select({ message, choices }) {
  const [err, response] = await to(
    new MultiSelect({
      message,
      choices,
      hint: chalk.dim(`\nUse <space> to select, <enter> to submit\n`),
      validate(value) {
        return value.length === 0 ? `Please select at least one todo.` : true;
      },
    })
      .on(`cancel`, () => shouldCliCancel())
      .run()
  );

  handleCliError("INPUT: ", err);
  return response;
}
