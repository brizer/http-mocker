import { CommanderStatic, Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class UICommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('ui')
      .alias('u')
      .description('Launch GUI to editor config file of http-mockjs')
      .action(async (command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        await this.action.handle(inputs, options);
      });
  }
}
