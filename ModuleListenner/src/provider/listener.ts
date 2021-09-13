import '../interface';



export class Listener implements EventDispatcher.ListenerCollection {

    public listener: { [key: string]: Function };


    // public constructor(){
    //
    // }

    add(listener: Function, notify: string): EventDispatcher.ListenerCollection {
        const clone = Object.create(this);

        clone.listener = Object.create(this.listener);

        clone.listener[notify] = listener;


        return clone;

    }

    get(notify: string) {
        if(this.listener.hasOwnProperty(notify)){
            return this.listener[notify];
        }

    }

}