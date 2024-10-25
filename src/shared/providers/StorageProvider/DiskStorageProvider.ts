import uploadConfig from '@config/upload';
import IStorageService from '@shared/domain/models/IStorageService';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider implements IStorageService {
  getFile(file: string): string {
    return `https://apianjobom.victordev.shop/uploads/${file}`;
  }

  public async saveFile(file: string): Promise<string> {
    const tempFilePath = path.resolve(uploadConfig.tempFolder, file);
    const finalFilePath = path.resolve(uploadConfig.directory, file);

    await fs.promises.rename(tempFilePath, finalFilePath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch (error:any) {
      if (error.code === 'ENOENT') {
        console.warn(`Arquivo não encontrado para excluir: ${filePath}`);
      } else {
        console.error(`Erro ao excluir o arquivo: ${error.message}`);
      }
    }
  }
}
