import { createConfigFile } from "http-mockjs-util/initConfig";
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
import { INFO_PREFIX } from "../lib/ui";
export class InitAction extends AbstractAction {
  public async handle(inputs: Input[], outputs: Input[], extraFlags: string[]) {
    console.log(`\n${INFO_PREFIX} config file is generating...\n`);
    await createConfigFile();
    console.log(`\n${INFO_PREFIX} config file was generated\n`);
  }
}
