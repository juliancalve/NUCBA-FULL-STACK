const jwt = require('jsonwebtoken');

const generateJWT = ( { firstName, lastName, email } ) => {
    return new Promise((resolve, reject) => {
        const payload = { firstName, lastName, email };
        jwt.sign( payload, 'mi-palabra-secreta', {}, ( err, token ) => {
            if(err) {
                reject( err );
            }
            if(token){
                resolve(token);
            }
        })
    });
}

module.exports = { generateJWT };