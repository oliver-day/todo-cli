import fs from "fs";
import path from "path";
import welcome from "cli-welcome";
import unhandled from "cli-handle-unhandled";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
);

export default ({ clear = true }) => {
  unhandled();
  welcome({
    title: `cli-todo`,
    tagLine: `by ${pkg.author.name}`,
    description: pkg.description,
    version: pkg.version,
    bgColor: "#36BB09",
    color: "#000000",
    bold: true,
    clear,
  });
};
