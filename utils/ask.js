import enquirer from "enquirer";
import { to } from "await-to-js";
import shouldCliCancel from "cli-should-cancel";
import handleCliError from "cli-handle-error";

const { Input } = enquirer;

export default async function ask({ message }) {
  const [err, response] = await to(
    new Input({
      message,
      validate(value) {
        return !value ? `Please enter a value.` : true;
      },
    })
      .on(`cancel`, () => shouldCliCancel())
      .run()
  );

  handleCliError("INPUT: ", err);
  return response;
}
