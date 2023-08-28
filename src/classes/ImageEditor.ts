import type { BufferRet } from 'jpeg-js'

export default class ImageEditor {
    readonly bytesPerPixel = 4
    width
    height
    data

    constructor({ width, height, data }: BufferRet) {
        this.width = width
        this.height = height
        this.data = data
    }

    greyscale(): BufferRet {
        const bwPixelData = Buffer.alloc(this.data.length)

        for (let vrt = 0; vrt < this.height; vrt++) {
            for (let hrz = 0; hrz < this.width; hrz++) {
                const offset = (vrt * this.width + hrz) * this.bytesPerPixel

                const red = this.data[offset]
                const green = this.data[offset + 1]
                const blue = this.data[offset + 2]

                const bwPixel = Math.round((red + green + blue) / 3.0)

                bwPixelData[offset] = bwPixel
                bwPixelData[offset + 1] = bwPixel
                bwPixelData[offset + 2] = bwPixel
            }
        }

        return {
            data: bwPixelData,
            width: this.width,
            height: this.height,
        }
    }

    sepia(): BufferRet {
        const sepiaPixelData = Buffer.alloc(this.data.length)

        for (let vrt = 0; vrt < this.height; vrt++) {
            for (let hrz = 0; hrz < this.width; hrz++) {
                const offset = (vrt * this.width + hrz) * this.bytesPerPixel

                const red = this.data[offset]
                const green = this.data[offset + 1]
                const blue = this.data[offset + 2]

                let sepiaRed = Math.round(
                    0.393 * red + 0.769 * green + 0.189 * blue
                )
                let sepiaGreen = Math.round(
                    0.349 * red + 0.686 * green + 0.168 * blue
                )
                let sepiaBlue = Math.round(
                    0.272 * red + 0.534 * green + 0.131 * blue
                )

                if (sepiaRed > 255) sepiaRed = 255
                if (sepiaGreen > 255) sepiaGreen = 255
                if (sepiaBlue > 255) sepiaBlue = 255

                sepiaPixelData[offset] = sepiaRed
                sepiaPixelData[offset + 1] = sepiaGreen
                sepiaPixelData[offset + 2] = sepiaBlue
            }
        }

        return {
            data: sepiaPixelData,
            width: this.width,
            height: this.height,
        }
    }

    reflect(): BufferRet {
        const reflectedPixelData = Buffer.from(this.data)

        for (let vrt = 0; vrt < this.height; vrt++) {
            for (let hrz = 0; hrz < this.width / 2; hrz++) {
                const offsetA = (vrt * this.width + hrz) * this.bytesPerPixel
                const offsetB =
                    (vrt * this.width + (this.width - 1 - hrz)) *
                    this.bytesPerPixel

                for (let b = 0; b < this.bytesPerPixel; b++) {
                    const tmp = reflectedPixelData[offsetA + b]
                    reflectedPixelData[offsetA + b] =
                        reflectedPixelData[offsetB + b]
                    reflectedPixelData[offsetB + b] = tmp
                }
            }
        }

        return {
            data: reflectedPixelData,
            width: this.width,
            height: this.height,
        }
    }

    blur(): BufferRet {
        const bluredPixelData = Buffer.alloc(this.data.length)

        for (let vrt = 0; vrt < this.height; vrt++) {
            for (let hrz = 0; hrz < this.width; hrz++) {
                const offset = (vrt * this.width + hrz) * this.bytesPerPixel

                let counter = 0

                let totalRed = 0
                let totalGreen = 0
                let totalBlue = 0

                for (let y = vrt - 9; y < vrt + 10; y++) {
                    for (let x = hrz - 9; x < hrz + 10; x++) {
                        if (y < 0 || y >= this.height) continue
                        if (x < 0 || x >= this.width) continue

                        const offsetSquare =
                            (y * this.width + x) * this.bytesPerPixel

                        const squareRed = this.data[offsetSquare]
                        const squareGreen = this.data[offsetSquare + 1]
                        const squareBlue = this.data[offsetSquare + 2]

                        counter = counter + 1

                        totalRed = totalRed + squareRed
                        totalGreen = totalGreen + squareGreen
                        totalBlue = totalBlue + squareBlue
                    }
                }

                const averageR = Math.floor(totalRed / counter)
                const averageG = Math.floor(totalGreen / counter)
                const averageB = Math.floor(totalBlue / counter)

                bluredPixelData[offset] = averageR
                bluredPixelData[offset + 1] = averageG
                bluredPixelData[offset + 2] = averageB
            }
        }

        return {
            data: bluredPixelData,
            width: this.width,
            height: this.height,
        }
    }
}
