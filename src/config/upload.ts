import multer, { StorageEngine } from 'multer';

export const uploadConfig = {
  uploadsFolder: './src/database/blobs'
}

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })
