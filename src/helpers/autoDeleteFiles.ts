/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { ORIGINALS_DIR, EDITED_DIR } from '../consts'

export default async function autoDeleteFiles() {
    try {
        const originalFiles = await fs.promises.readdir(ORIGINALS_DIR)
        const editedFiles = await fs.promises.readdir(EDITED_DIR)

        if (!originalFiles || !editedFiles) {
            throw new Error('Error reading file directory')
        }

        if (originalFiles.length === 0 && editedFiles.length === 0) {
            console.log('No files to delete.')
            return
        }

        const deleteOriginalFilePromises = originalFiles.map(async (file) => {
            try {
                if (file) {
                    await fs.promises.unlink(path.join(ORIGINALS_DIR, file))
                }
            } catch (error) {
                console.error(`Error deleting file: ${file}`, error)
            }
        })
        await Promise.all(deleteOriginalFilePromises)

        const deleteEditedFilePromises = editedFiles.map(async (file) => {
            try {
                if (file) {
                    await fs.promises.unlink(path.join(EDITED_DIR, file))
                }
            } catch (error) {
                console.error(`Error deleting file: ${file}`, error)
            }
        })
        await Promise.all(deleteEditedFilePromises)
        console.log('All files deleted successfully')
    } catch (error) {
        console.error(`Error deleting file: ${error}`)
    }
}
