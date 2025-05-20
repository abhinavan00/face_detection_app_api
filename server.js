import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleProfileId from './controllers/profileId.js';
import {handleImage} from './controllers/image.js';
import {handleAPICall} from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: '',
    password: '',
    database: 'face_detection_app',
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Working!')
})

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfileId(req, res, db)})

app.put('/image', (req, res) =>  {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleAPICall(req, res)})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})