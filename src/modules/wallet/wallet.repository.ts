import { EntityRepository, Equal, Repository } from 'typeorm';
import { WalletEntity } from './entity/wallet.entity';

@EntityRepository(WalletEntity)
export class WalletRepository extends Repository<WalletEntity>{
    
    async findByUserId(userId:string){
        const container = await super.findOne({where:{user:Equal(userId)}});
        return container;
    }
}
