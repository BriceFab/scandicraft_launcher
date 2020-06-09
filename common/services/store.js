const Store = require('electron-store');
import { encrypt, decrypt } from './crypto';

export const store = new Store();

export function storeGet(key) {
    if (store.has(key)) {
        let data = store.get(key);
        let data_decrypted = decrypt(data);
        // console.log(`store get decrypted data: ${key} - ${data_decrypted}`);
        return data_decrypted;
    } else {
        console.log('store doesn\'t have key', key);
    }
    return null;
}

export function storeSet(key, data) {
    let data_crypted = encrypt(data);
    // console.log(`store set crypted data: ${key} - ${data_crypted} `);
    store.set(key, data_crypted)
    return data_crypted;
}