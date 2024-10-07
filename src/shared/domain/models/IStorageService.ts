export default interface IStorageService{
  saveFile(file:string): Promise<string>;
  deleteFile(file:string): Promise<void>
}