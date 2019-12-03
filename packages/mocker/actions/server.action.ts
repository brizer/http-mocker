import express from "express";
import color from "http-mockjs-util/color";
import { Input } from "../commands";
import { AbstractAction } from "./abstract.action";
import { mocker } from "../lib";
export class ServerAction extends AbstractAction {
  public async handle(inputs: Input[], outputs: Input[], extraFlags: string[]) {
    const port: string = outputs.find(option => option.name === "port")!
      .value as string;
    const app = express();
    console.log(color(` Init proxy in port: ${port}`).green);
    mocker(app, {
      port: port
    });
    app.listen(port);
  }
}
