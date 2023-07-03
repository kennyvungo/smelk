const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');

// Express Routers
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//SECURITY MIDDLEWARE
if (!isProduction) {
    app.use(cors());
}
app.use(
    csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

// attaching Express Routers
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
module.exports = app;
