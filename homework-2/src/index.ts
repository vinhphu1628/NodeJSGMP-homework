import express from 'express';
import Joi from 'joi';

const app = express();
const PORT = 3000;

type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
  }

const userData: User[] = [
    {
        id: '1',
        login: 'vinhphu1628',
        password: 'Vinhphu1628',
        age: 24,
        isDeleted: false
    }
];

const userSchema = Joi
    .object()
    .keys({
        id: Joi.number().integer().required(),
        login: Joi.required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{0,}$/).required(),
        age: Joi.number().integer().min(4).max(130).required(),
        isDeleted: Joi.boolean().required()
    });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my homework-2!');
});

// get all users
app.get('/user', (req, res) => {
    res.json(userData);
});

// get user by id
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const result = userData.find((user: User) => user.id.toString() === id.toString());

    if (!result) {
        return res.send('No such user!');
    }

    res.json(result);
});

// create user
app.post('/user', (req, res) => {
    const newUser: User = req.body;
    const { error, value } = userSchema.validate(newUser);

    if (!!error) {
        return res.status(400).send(error.details[0].message);
    }

    userData.push(value);
    res.send(`Added, user ${value.login}!`);
});

// update user
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const newUser: User = req.body;

    const { error, value } = userSchema.validate(newUser);

    if (!!error) {
        return res.status(400).send(error.details[0].message);
    }

    const userIdx = userData.findIndex((user: User) => user.id.toString() === id.toString());

    if (userIdx === -1) {
        return res.send('No such user!');
    }

    userData[userIdx] = value;
    res.send(`User has been updated for ${userData[userIdx].login}!`);
});

// delete user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const userIdx = userData.findIndex((user: User) => user.id.toString() === id.toString());

    if (userIdx === -1) {
        return res.send('No such user!');
    }

    userData[userIdx].isDeleted = true;
    res.send(`User ${userData[userIdx].login} has been deleted!`);
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
