import { IHashProvider } from '../models/IHashProvider';
import { compare, hash } from 'bcryptjs';
class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload

  }
  async compareHash(payload: string, hashedPassword: string): Promise<boolean> {
    return payload === hashedPassword;
  }
}
export default FakeHashProvider;