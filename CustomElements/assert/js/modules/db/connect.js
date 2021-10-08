import {ConnectionError} from "@models/db/connection-error";

export class Connect {

    static _version = 1;

    constructor(version) {
        if (version === undefined || !version) {
            version = Connect._version;
        }

        let connection = indexedDB.open('customization', version);

        connection.onupgradeneeded = function () {
            const db = connection.result;

            if (db.version === 0) {
                console.log("Need initilization");
            }
            if (db.version < version) {
                console.log("Old version of db");
            }
        };
        connection.onerror = function () {
            throw new ConnectionError(`Connection error: ${connection.error.toString()}`);
        };
        connection.onsuccess = () => {
            this.db = connection.result;
        }
    }

    custom(){
        if(!this.db.objectStoreNames.contains('customization-elements')){
            this.db.createObjectStore("customization-elements", {
                keyPath : 'id'
            })
        }
    }

    deleteCustom(){
        if(!this.db.objectStoreNames.contains('customization-elements')){
            this.db.deleteObjectStore('customization-elements')
        }
    }
}