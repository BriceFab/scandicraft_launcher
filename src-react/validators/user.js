import { required, length, email } from "redux-form-validators";

const userValidator = {
    username: [
        required(), length({ min: 5, max: 20 })
    ],
    email: [
        required(), email()
    ],
    password: [
        required(), length({ min: 8, max: 128 })
    ],
};
export default userValidator;