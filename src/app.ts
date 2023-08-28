import express from 'express'
import fileUpload from 'express-fileupload'
import imageRouter from './routers/imageRouter'

const app = express()

/** MIDDLEWARES */
app.use('/', express.static('public'))
app.use(express.json())
app.use(fileUpload())

/** ROUTE */
app.use('/api/v1/images', imageRouter)

export default app
