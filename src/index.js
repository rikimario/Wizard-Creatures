const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');

const { PORT, DB_URL } = require('./constants');
const routes = require('./router');

// Init
const app = express();

// static middleware
app.use(express.static(path.resolve(__dirname, './public')));
// body parser
app.use(express.urlencoded({ extended: false }));
// cookie-parser
app.use(cookieParser());
// auth
app.use(auth);

// Handlebars Configuration
app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => console.log(`Error while connecting to DB. Error: ${err}`));

//* 2.3 configure routs
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));