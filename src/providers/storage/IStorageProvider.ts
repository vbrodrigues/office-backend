export interface FileData {
  content: Buffer;
  filename: string;
}


export interface IStorageProvider {
  upload: (file: FileData) => Promise<string>;
  download: (filePath: string) => Promise<Buffer>;
}
