const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cookieSession = require("cookie-session");

require('./db.js');

const server = express();

server.name = 'API';

const allowedOrigins = [
  'http://localhost:3000',
  'https://otra-ip-o-dominio.com'
];

server.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});


server.use(
  cookieSession({
    name: "FOOD-API",
    secret: process.env.COOKIE_SECRET, // Crear variable
    httpOnly: true,
    sameSite: "none",
    secure: true
  })
);

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
