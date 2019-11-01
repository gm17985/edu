import Advert from '../model/advert'
import formidable from 'formidable'
import config from '../config'
import { basename } from 'path'

export function render(req, res, next) {
  const page = Number.parseInt(req.query.page)
  const pageSize = 2
  Advert.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec((err, adverts) => {
      if (err) {
        return next(err)
      }
      Advert.count((err, count) => {
        if (err) {
          return next(err)
        }
        const totalPage = count / pageSize
        res.render('advert_list.html', {
          adverts,
          totalPage,
          page
        })
      })
    })
}

export function addRender(req, res, next) {
  res.render('advert_add.html')
}

export function add(req, res, next) {
  const form = new formidable.IncomingForm()
  // 配置formidable文件上传路径
  form.uploadDir = config.uploadDir
  form.keepExtensions = true
  // fields 表单中普通字段
  // files  表单中的文件
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const body = fields
    body.image = basename(files.image.path)
    const advert = new Advert({
      title: body.title,
      image: body.image,
      start_time: body.start_time,
      end_time: body.end_time,
      link: body.link
    })
    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_no: 0
      })
    })
  })
}

export function findAll(req, res, next) {
  Advert.find((err, data) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_no: 0,
      data: data
    })
  })
}

export function findOne(req, res, next) {
  Advert.findById(req.params.advertId, (err, data) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_no: 0,
      data: data
    })
  })
}

export function edit(req, res, next) {
  Advert.findById(req.body.id, (err, advert) => {
    if (err) {
      return next(err)
    }
    advert.title = req.body.title
    advert.image = req.body.image
    advert.start_time = req.body.start_time
    advert.end_time = req.body.end_time
    advert.link = req.body.link
    advert.save((err, advert) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_no: 0
      })
    })
  })
}

export function del(req, res, next) {
  Advert.remove({ _id: req.params.advertId }, err => {
    if (err) {
      return next(err)
    }
    res.json({
      err_no: 0
    })
  })
}
