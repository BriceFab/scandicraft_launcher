import jwt from 'jsonwebtoken';

export default function hasExpired(token) {
    if (token !== null) {
        try {
            let decoded = jwt.decode(token);

            if (Date.now() / 1000 > decoded.exp) {
                console.log("token expired");
            } else {
                console.log("token not expired");

                return false;
            }
        } catch (err) {
            console.log('token decode', err)
        }
    }

    return true;
}