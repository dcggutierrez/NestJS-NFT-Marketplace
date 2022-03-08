import { EntityRepository, Equal, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    
    async viewProfile(userId:string){
        return await super.findOne({ id: Equal(userId) });
    }
}
