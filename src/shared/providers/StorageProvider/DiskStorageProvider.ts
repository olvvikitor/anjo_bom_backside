import uploadConfig from '@config/upload';
import IStorageService from '@shared/domain/models/IStorageService';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider implements IStorageService {
  getFile(file: string): string {
    return `http://localhost:5000/uploads/${file}`;
  }

  public async saveFile(file: string): Promise<string> {
    const tempFilePath = path.resolve(uploadConfig.tempFolder, file);
    const finalFilePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.rename(tempFilePath, finalFilePath);
      console.info(`Arquivo salvo com sucesso: ${file}`);
      return file;
    } catch (error:any) {
      console.error(`Erro ao mover o arquivo para o diretório final: ${error.message}`);
      throw new Error('Não foi possível salvar o arquivo.');
    }
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
      console.info(`Arquivo excluído com sucesso: ${filePath}`);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`Arquivo não encontrado para excluir: ${filePath}`);
      } else {
        console.error(`Erro ao excluir o arquivo: ${error.message}`);
        throw new Error('Não foi possível excluir o arquivo.');
      }
    }
  }
}
