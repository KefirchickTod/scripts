import '../interface';

export class Provider implements EventDispatcher.ListenerProvider {

    private listener: EventDispatcher.ListenerCollection;

    public constructor(listener: EventDispatcher.ListenerCollection) {
        this.listener = listener;
    }

    public getListenerForEvent(notify: string) {
        return this.listener.get(notify);
    }
}