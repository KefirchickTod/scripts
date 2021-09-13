/**
 * @author My
 */
namespace EventDispatcher {
    export interface Dispatcher {
        /**
         * @return Object
         * @param notify
         */
        dispatch(notify: string): Function
    }

    export interface ListenerProvider {
        /**
         * @param notify
         * @return Iterable
         */
        getListenerForEvent(notify: string);
    }

    export interface StoppableEvent {
        /**
         * @return boolean
         */
        isPropagationStopped(): boolean;
    }

    export interface ListenerCollection {

        add(listener: Function, notify: string): ListenerCollection;


        get(notify: string);


    }
}
