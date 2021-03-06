const Router = require('@koa/router')
const router = new Router()

router.get('/books', async (ctx, next) => {
  const Books = ctx.model('Books')
  const { query } = ctx

  let bookCount = (await Books.find()).length
  let hasFilters = false
  const filters = {}

  if (query.isbn) {
    filters.isbn = new RegExp(query.isbn, 'i')
    hasFilters = true
  }

  if (query.title) {
    filters.title = new RegExp(query.title, 'i')
    hasFilters = true
  }

  if (query.author) {
    filters.author = new RegExp(query.author, 'i')
    hasFilters = true
  }

  let { page } = query
  page = page || 1
  const results = await Books.find(filters).skip((page - 1) * 15).limit(15).sort({ created: -1 })

  if (hasFilters) {
    bookCount = results.length
  }

  ctx.body = { data: results, total: bookCount }
})

router.get('/books/:id', async (ctx, next) => {
  const Books = ctx.model('Books')
  const { params } = ctx
  ctx.body = await Books.findOne({ _id: params.id })
})

router.post('/books/:isbn', async (ctx, next) => {
  const { params, request } = ctx
  const Books = ctx.model('Books')
  const existingBook = await Books.findOne({ isbn: params.isbn })

  if (!existingBook) {
    try {
      ctx.body = await Books.create({
        title: request.body.title,
        isbn: params.isbn,
        author: request.body.author,
      })
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = { error: err.message }
      ctx.app.emit('error', err, ctx)
    }
  } else {
    ctx.body = existingBook
  }
})

module.exports = router
