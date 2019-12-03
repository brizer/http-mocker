import color from 'http-mockjs-util/color';
import { CommanderStatic } from 'commander';
import { ERROR_PREFIX } from '../lib/ui';
import { InitAction, ServerAction, UIAction } from '../actions';
import { InitCommand } from './init.command';
import { ServerCommand } from './server.command';
import { UICommand } from './ui.command';



export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new InitCommand(new InitAction()).load(program);
    new ServerCommand(new ServerAction()).load(program);
    new UICommand(new UIAction()).load(program);
    this.handleInvalidCommand(program);
  }
  // validate 
  private static handleInvalidCommand(program: CommanderStatic) {
    
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${color('%s').red}`,
        program.args.join(' '),
      );
      console.log(
        `See ${color('--help').red} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
