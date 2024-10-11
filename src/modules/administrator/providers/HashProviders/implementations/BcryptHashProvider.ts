import { IHashProvider } from '../models/IHashProvider';
import { compare, hash } from 'bcryptjs';
class BcryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8)

  }
  async compareHash(payload: string, hashedPassword: string): Promise<boolean> {
    return await compare(payload, hashedPassword);
  }
}
export default BcryptHashProvider;