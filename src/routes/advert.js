import express from 'express'
import * as advert from '../controllers/advert'

const router = express.Router()

router
  .get('/advert', advert.render)
  .get('/advert/add', advert.addRender)
  .post('/advert/add', advert.add)
  .get('/advert/list', advert.findAll)
  .get('/advert/show/:advertId', advert.findOne)
  .post('/advert/edit/', advert.edit)
  .get('/advert/del/:advertId', advert.del)

export default router
