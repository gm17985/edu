import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import indexRouter from './routes/index'
import advertRouter from './routes/advert'
import errLog from './middleware/errLog'
import bodyParser from 'body-parser'

const app = express()

app.use('/node_modules/', express.static(config.nodeModulesPath))
app.use('/public/', express.static(config.publicPath))

// 配置使用nunjucks模板引擎
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
})

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(indexRouter)
app.use(advertRouter)

app.use(errLog)

app.listen(3000, () => {
  console.log('running at 3000')
})
