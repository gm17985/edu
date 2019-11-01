import { join } from 'path'
export default {
  viewPath: join(__dirname, '../views/'),
  nodeModulesPath: join(__dirname, '../node_modules/'),
  publicPath: join(__dirname, '../public/'),
  uploadDir: join(__dirname, '../public/uploads')
}
