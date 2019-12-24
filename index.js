require('dotenv').config()
const Koa = require('koa')
const logger = require('koa-logger')
const BodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const { db } = require('./database')

const app = new Koa()
app.use(logger())
app.use(BodyParser())
app.use(cors({
  origin: '*'
}))
app.use(db)

const router = require('./routes')

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)