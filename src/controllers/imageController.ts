import type { NextFunction, Request, Response } from 'express'
import AppError from '../classes/appError'
import ImageEditor from '../classes/ImageEditor'
import { ORIGINALS, ORIGINALS_DIR, EDITED } from '../consts'
import { decodeImage, encodeImage } from '../helpers/decoder'
import { ImageSchema, ApplyFilterQueryShema } from '../shemas'

export const uploadImage = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const image = ImageSchema.parse(req.files?.image)

        await image.mv(`${ORIGINALS_DIR}/${image.name}`)

        res.status(200).json({ imageUrl: `${ORIGINALS}/${image.name}` })
    } catch (error) {
        next(new AppError('Could not load an image', 500))
    }
}

export const applyFilter = function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { imageName, filterName } = ApplyFilterQueryShema.parse(req.query)

        const decodedImage = decodeImage(imageName)

        const imageEditor = new ImageEditor(decodedImage)
        const processedImage = imageEditor[filterName]()

        encodeImage(imageName, processedImage)

        res.status(200).json({ editedImageUrl: `${EDITED}/${imageName}` })
    } catch (error) {
        next(new AppError('An error occurred while applying the filter', 500))
    }
}
