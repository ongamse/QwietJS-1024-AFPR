const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { logger } = require('./Logger');
const registerApiRoutes = require('./api');
const registerViewRoutes = require('./views');

const app = express();
const port = process.env.PORT || 8088;
const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY || 'kjhdkd-sjkhsjsh-kjshshkdhsk-jsjhd';

const tarpitEnv = {
  sessionSecretKey: process.env.SESSION_SECRET_KEY || SESSION_SECRET_KEY,
  applicationPort: process.env.PORT || 8088
};

app.set('tarpitEnv', tarpitEnv);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true }
  })
);

app.set('view engine', 'pug');
app.set('views', `./src/Views`);

registerApiRoutes(app);
registerViewRoutes(app);

app.listen(port, () =>
  logger.log(
    `Tarpit App listening on port ${port}!. Open url: http://localhost:${port}`
  )
);


