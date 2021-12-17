const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const UserSchema = require('./Schemas/UserSchema');
const { generateJWT } = require('./utils/jwt');
const { jwtValidator } = require('./middlewares/jwt.middleware');
const { check } = require('express-validator');
const { validateFields } = require('./middlewares/validateFields.middleware');
const { encryptPassword, comparePasswords } = require('./utils/bcrypt');
const { mailSender } = require('./utils/emailSender');
// mongodb+srv://<username>:<password>@cluster0.7vpom.mongodb.net/myFirstDatabase
// const uri ="mongodb+srv://:@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority";
const uri = "mongodb+srv://pepitopepe1994:pass1357@cluster0.7vpom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//retryWrites=true&w=majority
const dbConnection = async () => {

    try {
        mongoose.connect( uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const db = mongoose.connection;

        db.on( 'error', ( error ) => {
            console.log( error );
        });

        db.once( 'open', () => {
            console.log( 'db open' );
        });

        console.log( 'db online' );
    
    } catch ( error ) {
        console.log( error );
        throw new Error( error );
    }
};

dbConnection();

const PORT = process.env.PORT || 3100;

app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use( cors() );

app.get('/api/get-user', [jwtValidator], async (req, res) => {
    let token = req.header('authorization');
    token = token?.replace('Bearer ', '');
    const user = await UserSchema.findOne({ token });
    const { firstName, lastName, age, email } = user;
    if(user) {
        res.send({ firstName, lastName, age, email });
    } else {
        res.send('No tenes token');
    }
});

app.post('/api/user', [
    check('email').notEmpty(),
    check('password').notEmpty(),
    validateFields
], async (req, res) => {
    try {
        const { email, password, age, firstName, lastName } = req.body;
        const hashedPassword = encryptPassword(password);
        console.log(hashedPassword);
        const token = await generateJWT({ firstName, lastName, email });
        const user = await new UserSchema({ email, password: hashedPassword, age, firstName, lastName, token }).save();
        await mailSender(email, token);
        res.send(user);
    } catch( error ) {
        res.send(error);
    }
});

app.get('/api/activate/:token', async (req, res) => {
    const { token } = req.params;
    const user = await UserSchema.findOneAndUpdate({ token }, { emailIsVerified: true });
    console.log(user)
    if(user){

        res.send("salio ok")
    } else {
        res.send('salio mal')
    }
})

app.get('/api/user', async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.send({ data: users });
    } catch(error) {
        res.send(error);
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserSchema.findOne({ _id: id });
        res.send({ data: user })
    } catch( error ){
        res.send(error);
    }
});

app.delete('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserSchema.findOneAndUpdate({ _id: id }, { enabled: false });
        res.send(!!deleted);
    } catch( error ){
        res.send(error);
    }
});

app.get('/api/user/enable/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserSchema.findOneAndUpdate({ _id: id }, { enabled: true });
        res.send(!!deleted);
    } catch( error ){
        res.send(error);
    }
});

app.post('/api/login',
    [
        check('email').notEmpty().isEmail(),
        check('password').notEmpty(),
        validateFields
    ],
    async (req, res) => {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email });
        if(user.emailIsVerified){

            const isValid = comparePasswords(password, user.password);
            if(isValid) {
                res.status(202).send({ data: user.token});
            } else {
                res.status(404).send({ message: 'Email o contraseña invalidos'})
            }
        } else {
            res.send('No actuvaste tu email')
        }
})

app.get('/api/send-mail', async (req, res) => {
    try {

        const sended = await mailSender();
        if(sended){

            res.send({sended, message: 'si'});
        } else {
            res.send({ sended, message: 'no' })
        }
    } catch( error ){
        res.send({'error': error});

    }
});

app.listen(PORT, () => {
    console.log(`La app esta corriendo en el puerto ${PORT}`);
})