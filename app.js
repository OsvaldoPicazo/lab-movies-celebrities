// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const celebritiesRouter = require('./routes/celebrities.routes');
app.use('/celebrities', celebritiesRouter);

const moviesRouter = require('./routes/movies.routes');
app.use('/movies', moviesRouter);

const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

const privateRouter = require('./routes/private.routes')
app.use('/private',  privateRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
