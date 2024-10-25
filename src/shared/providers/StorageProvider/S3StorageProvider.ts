import mime from 'mime-types';
import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import IStorageService from '@shared/domain/models/IStorageService';

export default class S3StorageProvider implements IStorageService {
  private client: S3;

  constructor() {
    try {
      this.client = new aws.S3({
        region: 'us-east-1',
      });
    } catch (error) {
      console.error('Erro ao configurar o cliente S3:', error);
      throw new Error('Não foi possível conectar ao serviço S3.');
    }
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);
    const ContentType = mime.lookup(originalPath);

    if (!ContentType) {
      throw new Error(`Tipo de arquivo inválido: ${ContentType}`);
    }

    try {
      const fileContent = await fs.promises.readFile(originalPath);

      await this.client
        .putObject({
          Bucket: 'api-anjobom',
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: ContentType,
        })
        .promise();

      await fs.promises.unlink(originalPath);
    } catch (error) {
      console.error('Erro ao salvar o arquivo no S3:', error);
      throw new Error('Não foi possível salvar o arquivo no S3.');
    }

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    try {
      await this.client
        .deleteObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
        })
        .promise();
    } catch (error) {
      console.error('Erro ao deletar o arquivo no S3:', error);
      throw new Error('Não foi possível deletar o arquivo no S3.');
    }
  }

  public getFile(file: string): string {
    return `https://api-anjobom.s3.amazonaws.com/${file}`;
  }
}
