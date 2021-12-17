const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);
    return hashedPassword;
}

const comparePasswords = (password, encryptedPassword) => {
    return bcryptjs.compareSync(password, encryptedPassword);
}

module.exports = { encryptPassword, comparePasswords };