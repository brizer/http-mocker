import { watch, FSWatcher } from "chokidar";
import getConfig , { getConfigPath } from "http-mockjs-util/getConfig";
import { socket, SOCKET_EVENTS } from "../socket/connection";

export class Watcher {
  private watcher: FSWatcher;
  constructor() {
    const configContent = getConfig(undefined);
    const configPath: string = getConfigPath();
    this.watcher = watch(configPath);
    this.init();
  }
  private init() {
    this.watchFiles();
  }

  private watchFiles() {
    this.watcher.on("all", path => {
      console.log("config file has changed");
      socket().emit(SOCKET_EVENTS.CHANGE_CONFIG);
    });
  }
}
