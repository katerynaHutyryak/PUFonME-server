import { z } from 'zod'
import crypto from 'crypto'

export const ImageSchema = z.object({
    name: z.string().transform(() => `${crypto.randomUUID()}.jpeg`),
    data: z.instanceof(Buffer),
    size: z
        .number()
        .max(50 * 1024 * 1024, 'File size limit is exceeded. Max: 50MB'),
    encoding: z.string(),
    tempFilePath: z.string(),
    truncated: z.boolean(),
    mimetype: z.string().refine((val) => val === 'image/jpeg', {
        message: 'Media type is not supported. Consider using: JPEG/JPG',
    }),
    md5: z.string(),
    mv: z.function(),
})

export const ApplyFilterQueryShema = z.object({
    filterName: z.union([
        z.literal('greyscale'),
        z.literal('sepia'),
        z.literal('reflect'),
        z.literal('blur'),
    ]),
    imageName: z.string(),
})
