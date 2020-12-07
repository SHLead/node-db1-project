const express = require('express');
const accountsRouter = require('./accounts/accounts-router');
// const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is up' });
});

module.exports = server;
