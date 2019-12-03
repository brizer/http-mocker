import { join } from "path";
import fs from "fs";
import jsonfile from "jsonfile";
import color from "./color";
import defaultConfig, { fileName } from "./defaultConfig";

export function createConfigFile(content?: string) {
  try {
    fs.readFileSync(join(process.cwd(), `./${fileName}`));
    console.log(color(` config file is already exist`).yellow);
    process.exit(0);
  } catch (error) {}
  const filePath = join(process.cwd(), `./${fileName}`);
  return jsonfile.writeFile(filePath, defaultConfig, { spaces: 4 });
}
