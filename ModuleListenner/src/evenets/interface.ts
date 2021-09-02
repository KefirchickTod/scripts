/**
 * @author My
 */
namespace EventDispatcher {
    export interface Dispatcher {
        /**
         * @return Object
         * @param event
         */
        dispatch(event: Function): Function
    }

    export interface ListenerProvider {
        /**
         * @param event
         * @return Iterable
         */
        getListenerForEvent(event: Function);
    }

    export interface StoppableEvent {
        /**
         * @return boolean
         */
        isPropagationStopped(): boolean;
    }
}
