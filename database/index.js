const mongoose = require('@south-paw/koa-mongoose')
const goodreads = require('goodreads-api-node')
const models = require('../models')

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  GOODREADS_API_KEY,
  GOODREADS_API_SECRET } = process.env

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
  goodreads: goodreads({
    key: GOODREADS_API_KEY,
    secret: GOODREADS_API_SECRET
  })
}