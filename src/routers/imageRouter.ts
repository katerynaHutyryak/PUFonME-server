import express from 'express'
import { uploadImage, applyFilter } from '../controllers/imageController'

const imageRouter = express.Router()

imageRouter.route('/upload').post(uploadImage)
imageRouter.route('/filter').get(applyFilter)

export default imageRouter
