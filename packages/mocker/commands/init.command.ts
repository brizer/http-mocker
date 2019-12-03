import { CommanderStatic, Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class InitCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('init')
      .alias('i')
      .description('Init config file in current path')
      .action(async (name: string, command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        await this.action.handle(inputs, options);
        process.exit(0);
      });
  }
}
