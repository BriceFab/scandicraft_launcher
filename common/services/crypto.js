const CryptoJS = require("crypto-js");
import CONFIG from '../../config/config.json';

const secretKey = CONFIG.STORAGE.KEY;

export function encrypt(brut_message) {
    try {
        if (isBoolean(brut_message)) {
            return brut_message;
        }
        let encrypted = CryptoJS.AES.encrypt(brut_message, secretKey);
        return encrypted.toString(CryptoJS.format.Utf8);
    } catch (error) {
        console.error('encrypt error', error)
        return null;
    }
}

export function decrypt(crypted_message) {
    try {
        if (isBoolean(crypted_message)) {
            return crypted_message;
        }
        let decrypted = CryptoJS.AES.decrypt(crypted_message, secretKey);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('decrypt error', error)
        return null;
    }
}

function isBoolean(message) {
    return typeof message === 'boolean';
}

/* TESTS */
// var myString = "BriceFab123";
// var myPassword = "myPassword";

// console.log('brut string', myString)
// console.log('encrypted string', encrypt(myString))
// console.log('decrypted string', decrypt(encrypt(myString)))