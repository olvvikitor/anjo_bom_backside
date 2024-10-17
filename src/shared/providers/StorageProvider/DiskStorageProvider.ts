import uploadConfig from '@config/upload';
import IStorageService from '@shared/domain/models/IStorageService';
import fs from 'fs';
import path from 'path';
export default class DiskStorageProvider implements IStorageService {
  getFile(file: string): string {
    const url = `https://apianjobom.victordev.shop/uploads/${file}`;
    return url;
  }
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file)
    )
    return file
  }
  public async deleteFile(file: string): Promise<void> {
    console.log(file)
    const filePath = path.resolve(uploadConfig.directory, file);
    try {
      await fs.promises.stat(filePath)

    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}