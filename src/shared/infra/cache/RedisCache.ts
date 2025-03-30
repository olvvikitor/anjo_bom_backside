import Redis, {Redis as RedisClient} from 'ioredis'
import cache from '@config/cache'
import { ICacheService } from '@shared/domain/models/ICacheService';

export default class RedisCache implements ICacheService{
  private client :RedisClient;
  constructor(){
    this.client = new Redis(cache.config.redis);
  }
  public async save(key: string, value: any): Promise<void>{
    await this.client.set(key,JSON.stringify(value));  
  }
  public async recover<T>(key: string): Promise<T|null>{
    const value = await this.client.get(key);
    if(!value) return null;
    return JSON.parse(value) as T;
  }
  public async invalidate(key: string): Promise<void>{
    await this.client.del(key);
  }
}