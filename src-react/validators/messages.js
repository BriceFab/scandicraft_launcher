import Validators from 'redux-form-validators';

// console.log('validators messages', Validators.messages);

Object.assign(Validators.messages, {
    tooShort: "minimum {count, number} caractères",
    tooLong: "maximum {count, number} caractères",
    email: "adresse email invalide",
    presence: "doit être rempli",
    url: "url invalide",
    confirmation: "Ne correspond pas avec `{fieldLabel}`"
});