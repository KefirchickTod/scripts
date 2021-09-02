/**
 * @interface
 */
import './interface';

class EventDispatcher implements EventDispatcher.Dispatcher {

    private provider: EventDispatcher.ListenerProvider;

    constructor(provider: EventDispatcher.ListenerProvider) {
        this.provider = provider;
    }

    /**
     * @return Object
     * @param event
     */
    dispatch(event: Function) {

        for (let listener of this.provider.getListenerForEvent(event)) {
            listener(event);
        }

        return event;
    }
}