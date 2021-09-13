/**
 * @interface
 */
import '../interface';

class EventDispatcher implements EventDispatcher.Dispatcher {

    private provider: EventDispatcher.ListenerProvider;

    constructor(provider: EventDispatcher.ListenerProvider) {
        this.provider = provider;
    }

    /**
     * @return Object
     * @param notify
     */
    dispatch(notify: string) {

        for (let listener of this.provider.getListenerForEvent(notify)) {
            if (listener instanceof EventDispatcher.StoppableEvent) return listener;

            listener(notify);
        }

        return notify;
    }
}