const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

// Read Mongo URI
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/icecream";
console.log("Mongo URI:", mongoURI);

// Connect
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');

  app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000");
  });
});

// Views
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// Static
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/axios/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap-datepicker/dist/js/'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('Hello, IceCream!'));
app.get('/stations', (req, res) => res.json([])); // Dummy for now

// Cron
cron.schedule("* * * * *", () => {
  console.log("Running cron job");
});