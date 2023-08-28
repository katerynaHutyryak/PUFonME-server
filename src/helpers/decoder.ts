import jpeg, { type BufferRet } from 'jpeg-js'
import fs from 'fs'
import { ORIGINALS_DIR, EDITED_DIR } from '../consts'

export const decodeImage = function (imageName: string): BufferRet {
    const jpegData: Buffer = fs.readFileSync(`${ORIGINALS_DIR}/${imageName}`)
    return jpeg.decode(jpegData)
}

export const encodeImage = function (
    imageName: string,
    image: BufferRet
): void {
    const IMAGE_QUALITY = 50 // recommended value
    const encodedImage = jpeg.encode(image, IMAGE_QUALITY)
    fs.writeFileSync(`${EDITED_DIR}/${imageName}`, encodedImage.data)
}
