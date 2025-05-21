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

// Updated CORS configuration
const corsOptions = {
  origin: 'https://face-detection-app-wenk.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));

// Preflight requests handler
app.options('*', cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
    // Add CORS headers manually for extra security
    res.header('Access-Control-Allow-Origin', 'https://face-detection-app-wenk.onrender.com');
    res.json('Working!');
});

// Apply the same manual CORS headers to all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://face-detection-app-wenk.onrender.com');
    next();
});

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {handleProfileId(req, res, db)});

app.put('/image', (req, res) => {handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {handleAPICall(req, res)});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});