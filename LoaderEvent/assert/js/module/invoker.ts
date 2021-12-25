import {CommandInterface} from './Commands/queue';

export class Invoker {
    protected command: [CommandInterface];

    setCommand(command: CommandInterface) {

        console.log(command, this.command);

        if(typeof this.command == 'undefined'){
            this.command = [command];
            return this;
        }
        this.command.push(command);

        return this;
    }

    run() {
        for(let cmd of this.command){
            cmd.execute();
        }
    }
}