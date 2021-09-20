import {CommandInterface} from "./queue";
import {Receiver} from '../receiver';

export class HelloCommand {

    private out: Receiver;

    constructor(receive: Receiver) {
        this.out = receive;
    }

    execute() {

        this.out.write('Hello world');
    }
}