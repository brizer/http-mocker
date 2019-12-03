import color from "http-mockjs-util/color";
import { spawn, ChildProcess } from "child_process";
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
export class UIAction extends AbstractAction {
  public async handle(inputs: Input[], outputs: Input[], extraFlags: string[]) {
    console.log(color(` GUI editor is launch`).green);
    await this.initUiProcess();
  }
  private async initUiProcess() {
    const uiProcess: ChildProcess = spawn("http-mockjs-ui");

    uiProcess.stdout.on("data", data => {
      console.log(`${data}`);
    });

    uiProcess.stderr.on("data", data => {
      console.log(color(`${data}`).red);
    });

    uiProcess.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
  }
}
