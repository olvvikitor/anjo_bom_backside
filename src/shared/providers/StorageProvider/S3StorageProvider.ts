import mime from 'mime-types';
import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, {S3} from 'aws-sdk'
import IStorageService from '@shared/domain/models/IStorageService';

export default class S3StorageProvider implements IStorageService{
  private client : S3;
  constructor(){
    this.client = new aws.S3({
      region: 'us-east-1',

    })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file)

    const ContentType =  mime.lookup(originalPath);

    if(!ContentType){
      throw new Error(`Invalid file type: ${ContentType}`);
    }
    
    const fileContent = await fs.promises.readFile(originalPath);
    await this.client.putObject({
      Bucket: 'api-anjobom',
      Key: file,
      ACL: 'public-read-write',
      Body: fileContent,
      ContentType: ContentType,
      
    }).promise();

    await fs.promises.unlink(originalPath);

    return file
  }
  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file
    }).promise()
  }
  public getFile(file:string): string{
    const url =  `https://api-anjobom.s3.amazonaws.com/${file}`
    return url;
  }
}