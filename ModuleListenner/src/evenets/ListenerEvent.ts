class ListenerEvent {

    protected collection: { [key: string]: Function };

    public constructor(collection: {} = {}) {
        this.collection = collection;
    }

    public offset(key: string): boolean {
        return this.collection.hasOwnProperty(key);
    }

    public add(key: string, event: Function) {
        if (this.offset(key)) {
            throw new Error(`${key} is already offset`);
        }

        this.collection[key] = event;
    }

}