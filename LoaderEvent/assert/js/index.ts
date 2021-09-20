//import './bootstrap';
import {Invoker} from "./module/invoker";
import {Receiver} from "./module/receiver";
import {HelloCommand} from "./module/Commands/hello";


function commandTry() {
    console.log("Command try");

    const invoker: Invoker = new Invoker();
    const receiver: Receiver = new Receiver();

    invoker.setCommand(new HelloCommand(receiver));
    invoker.run();
    console.log(receiver.getOutput());

}

commandTry();

