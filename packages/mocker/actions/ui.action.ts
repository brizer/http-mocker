import color from "http-mockjs-util/color";
import { cp } from "@tomato-node/process";
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
export class UIAction extends AbstractAction {
  public async handle(inputs: Input[], outputs: Input[], extraFlags: string[]) {
    console.log(color(` GUI editor is launch`).green);
    await this.initUiProcess();
  }
  private async initUiProcess() {

    const { stdout } = await cp.command('http-mockjs-ui');
    console.log(stdout)
  }
}
