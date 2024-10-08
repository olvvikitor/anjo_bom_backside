import multer, {StorageEngine} from 'multer';
import path from 'path';
import crypto from 'crypto'
const uploadFolder = path.resolve(__dirname, '..', '..','uploads');
const tempFolder = path.resolve(__dirname, '..', '..','temp');

export interface IUploadConfig {
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config:{
    aws:{
      bucket: string;
    }
  }
}
export default {
  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      
      destination: tempFolder,
      
      filename(request, file, callback){
        const fileHash = crypto.randomBytes(10).toString('hex')
  
        const filename = `${fileHash}-${file.originalname}`
  
        callback(null, filename)
      }
    }),
    limits: {
      fileSize: 50 * 1024 * 1024 // Limite de 10 MB
    }
  },
  config:{
    aws: {
      bucket: 'api-anjobom'
    }
  }
}as IUploadConfig
