const mongoose = require('@south-paw/koa-mongoose')
const models = require('../models')

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  GOOGLE_BOOKS_API } = process.env

module.exports = {
  db: mongoose({
    user: DB_USER,
    pass: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    db: 'books',
    mongodbOptions: {
      poolSize: 5,
      native_parser: true
    },
    schemas: models
  }),
  GOOGLE_BOOKS_API
}
