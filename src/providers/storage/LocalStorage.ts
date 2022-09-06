import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { uploadConfig } from '../../config/upload';
import { FileData, IStorageProvider } from "./IStorageProvider";

export class LocalStorage implements IStorageProvider {
  public async upload(file: FileData): Promise<string> {
    const fileHash = crypto.randomBytes(10).toString('hex');
    const fileName = `${fileHash}-${file.filename}`;
    const filePath = path.resolve(uploadConfig.uploadsFolder, fileName)
    fs.writeFile(filePath, file.content, () => {
      console.log('Uploaded file', file.filename, 'to', filePath)
    })
    return filePath;
  }


  public async download(filePath: string): Promise<Buffer> {
    const data = fs.readFileSync(filePath);
    return data;
  }
}
