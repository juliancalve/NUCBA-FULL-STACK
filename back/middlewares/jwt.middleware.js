const UserModel = require("../Schemas/UserSchema");


const jwtValidator = async (req, res, next) => {
    let token = req.header('authorization');
    token = token?.replace('Bearer ', '');
    const user = await UserModel.findOne({ token });
    if(user) {
        next();
    } else {
        res.send('No tenes token');
    }
};

module.exports = { jwtValidator };