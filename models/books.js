const Books = ({ Schema }) => new Schema(
  {
    goodreadsId: { type: String, index: true },
    title: { type: String, index: true },
    author: { type: String, index: true },
    formattedAuthor: String,
    image: String,
    isbn: String,
    created: { type: Date, default: Date.now }
  },
  { collection: 'books' }
)

module.exports = Books