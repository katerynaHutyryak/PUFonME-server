const ORIGINALS = 'originals'
const ORIGINALS_DIR = new URL(`../public/${ORIGINALS}`, import.meta.url)
    .pathname
const EDITED = 'edited'
const EDITED_DIR = new URL(`../public/${EDITED}`, import.meta.url).pathname

export { ORIGINALS, ORIGINALS_DIR, EDITED, EDITED_DIR }
