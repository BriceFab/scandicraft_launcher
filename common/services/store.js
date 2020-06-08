const Store = require('electron-store');
const CryptoJS = require("crypto-js");

export const store = new Store();
const secretKey = CryptoJS.enc.Utf8.parse("alfsdjalsdf");
const options = {
    iv: CryptoJS.enc.Utf8.parse("o8a7sdf97asdf"),
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
    let formated_message = isJson ? JSON.stringify(message) : message;
    return CryptoJS.AES.encrypt(formated_message, secretKey, options).toString(CryptoJS.format.Utf8);
}

function decrypt(crypted_message) {
    console.log('decrypt', crypted_message)
    var bytes = CryptoJS.AES.decrypt(crypted_message, secretKey, options);
    var decrypted_data = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decrypt bytes', bytes)
    console.log('isJson', decrypted_data)
    console.log('decrypt data', decrypted_data.length)
    if (decrypted_data.length > 0) {
        return JSON.parse(decrypted_data);
    }
    return null;
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}