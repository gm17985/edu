import mongodb from 'mongodb'

const mongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/edu'

export default (errLog, req, res, next) => {
  mongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, client) => {
      const db = client.db(client.dbName)
      db.collection('error_logs').insertOne(
        {
          name: errLog.name,
          message: errLog.message,
          stack: errLog.stack,
          time: new Date()
        },
        (err, result) => {
          res.json({
            err_code: 500,
            message: errLog.message
          })
        }
      )
      client.close()
    }
  )
}
