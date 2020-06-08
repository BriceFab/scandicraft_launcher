const Store = require('electron-store');
const CryptoJS = require("crypto-js");

export const store = new Store();
const secretKey = "alfsdjalsdf";
const IV = "o8a7sdf97asdf";
const options = {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
}

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
        console.warn('store doesn\'t have key', crypted_key)
    }
    return null;
}

export function storeSet(key, data) {
    const crypted_key = encrypt(key);
    return store.set(crypted_key, encrypt(data));
}

function encrypt(message) {
    console.log('encrypt', message)
    return CryptoJS.AES.encrypt(JSON.stringify({ message }), CryptoJS.enc.Utf8.parse(secretKey), options).toString();
}

function decrypt(crypted_message) {
    console.log('decrypt', crypted_message)
    var bytes = CryptoJS.AES.decrypt(crypted_message, CryptoJS.enc.Utf8.parse(secretKey), options);
    var decrypted_data = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decrypt data', decrypted_data.length)
    if (decrypted_data.length > 0) {
        return JSON.parse(decrypted_data);
    }
    return null;
}