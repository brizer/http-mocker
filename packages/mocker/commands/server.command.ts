import { CommanderStatic, Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class ServerCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('server')
      .alias('s')
      .description('launch http-mockjs as a server, then use it as a proxy')
      .option('-p, --port [port]', 'which port to launch mock server, default is 8008',8008)
      .action(async (command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'port', value: command.port });
        const inputs: Input[] = [];
        await this.action.handle(inputs, options);
      });
  }
}
