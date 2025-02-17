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
  'https://balance-loteria.vercel.app'
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

// 🔹 Agregar estos middlewares antes de las rutas
server.use(express.json());  // ✅ Para procesar JSON
server.use(express.urlencoded({ extended: true }));  // ✅ Para procesar formularios

server.use(
  cookieSession({
    name: "FOOD-API",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite: "none",
    secure: true
  })
);

server.use('/', routes);

// Error catching middleware
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
