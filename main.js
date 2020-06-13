'use strict'

if (process.env.NODE_ENV === 'development') {
  require('./localSecrets');
}

const {db} = require('./server/db')
const app = require('./server')

// *** very useful setup for deployment on Heroku!
const port = process.env.PORT || 3040

console.log(`
  The Node Env: ${process.env.NODE_ENV}
  SECRETS attached succesfully: ${process.env.GOOGLE_CALLBACK_URL}
  `)

db.sync()
// db.sync({ force: true })  // *** <== for a hard reset
  .then(() => {
    console.log('> db synced <')
    app.listen(port, () => {
      console.log(`
      Knock, knock
      Who's there?
      Your server, listening on port ${port}, aka...
      http://localhost:${port}/

    `)
    })
  })
  
