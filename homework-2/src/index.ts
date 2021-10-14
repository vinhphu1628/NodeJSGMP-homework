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
    },
    {
        id: '2',
        login: 'vinh1628',
        password: 'Vinhphu1628',
        age: 21,
        isDeleted: false
    },
    {
        id: '3',
        login: 'phu1628',
        password: 'Vinhphu1628',
        age: 23,
        isDeleted: false
    },
    {
        id: '4',
        login: 'vinhphu',
        password: 'Vinhphu1628',
        age: 26,
        isDeleted: false
    }
];

const userSchema = Joi
    .object()
    .keys({
        id: Joi.string().required(),
        login: Joi.required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{0,}$/).required(),
        age: Joi.number().integer().min(4).max(130).required(),
        isDeleted: Joi.boolean().required()
    });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my homework-2!');
});

// get all users && auto-suggest list from limit users
app.get('/users', (req, res) => {
    const { loginSubString, limit } = req.query;
    let result: User[] = [];

    if (loginSubString) {
        if (limit) {
            let count = parseInt(limit.toString(), 10);
            result = userData.filter((user: User) => {
                if (user.login.includes(loginSubString.toString()) && count > 0) {
                    count = count - 1;
                    return user;
                }
            });
            return res.json(result);
        }

        result = userData.filter((user: User) => {
            if (user.login.includes(loginSubString.toString())) {
                return user;
            }
        });
        res.json(result);
    } else {
        if (limit) {
            let count = parseInt(limit.toString(), 10);
            result = userData.filter((user: User) => {
                if (count > 0) {
                    count -= 1;
                    return user;
                }
            });
            return res.json(result);
        }

        res.json(userData);
    }
});

// get user by id
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const result = userData.find((user: User) => user.id === id);

    if (!result) {
        return res.send('No such user!');
    }

    res.json(result);
});

// create user
app.post('/user', (req, res) => {
    const newUser: User = req.body;
    const { error, value } = userSchema.validate(newUser);

    if (error) {
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

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const userIdx = userData.findIndex((user: User) => user.id === id);

    if (userIdx === -1) {
        return res.send('No such user!');
    }

    userData[userIdx] = value;
    res.send(`User has been updated for ${userData[userIdx].login}!`);
});

// delete user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const userIdx = userData.findIndex((user: User) => user.id === id);

    if (userIdx === -1) {
        return res.send('No such user!');
    }

    userData[userIdx].isDeleted = true;
    res.send(`User ${userData[userIdx].login} has been deleted!`);
});

app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
