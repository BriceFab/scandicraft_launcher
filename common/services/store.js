const Store = require('electron-store');
const CryptoJS = require("crypto-js");

export const store = new Store();
const secretKey = "alfsdjalsdf";

export function storeGet(key) {
    var crypted_key = encrypt(key);
    if (store.has(crypted_key)) {
        var store_value = store.get(crypted_key)
        var decrypted_value = decrypt(store_value);
        console.log('key', key)
        console.log('key crypted', crypted_key)
        console.log('value', store_value)
        console.log('value decrypted', decrypted_value)
        return decrypted_value;
    } else {
        console.warn('store doesn\'t have key', key)
    }
    return null;
}

export function storeSet(key, data) {
    const crypted_key = encrypt(key);
    return store.set(crypted_key, encrypt(data));
}

function encrypt(message) {
    console.log('encrypt', message)
    return CryptoJS.HmacSHA256(JSON.stringify({ message }), secretKey).toString();
}

function decrypt(crypted_message) {
    console.log('decrypt', crypted_message)
    var bytes = CryptoJS.AES.decrypt(crypted_message, secretKey);
    var utf8_data = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(utf8_data);
}