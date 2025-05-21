import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleProfileId from './controllers/profileId.js';
import {handleImage} from './controllers/image.js';
import {handleAPICall} from './controllers/image.js';

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// First, let's make your CORS configuration more flexible
const corsOptions = {
  origin: ['https://face-detection-app-wenk.onrender.com', process.env.FRONTEND_URL || 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(app.use(cors({ origin: '*' })));
app.use(express.json());

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