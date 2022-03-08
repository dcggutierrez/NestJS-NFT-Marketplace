import { EntityRepository, Repository } from 'typeorm';
import { NftEntity } from './entity/nft.entity';

@EntityRepository(NftEntity)
export class NftRepository extends Repository<NftEntity>{

}
