import { IStorageProvider } from "./IStorageProvider";

export class AmazonS3Storage implements IStorageProvider {
  public async upload(file: string): Promise<void> {
    console.log('Uploading to Amazon S3...')
  };

  public async download(filePath: string): Promise<string> {
    console.log('Downloading from Amazon S3...')
    return 'file';
  };
}
