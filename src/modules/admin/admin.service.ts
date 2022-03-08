import { BadRequestException, Injectable } from '@nestjs/common';
import { NftRepository } from '../nft/nft.repository';
import { NftEntity } from '../nft/entity/nft.entity';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entity/user.entity';
import { Like, Not } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        private readonly nftRepository:NftRepository,
        private readonly userRepository:UserRepository
    ){}

    async takeDownNft(input:string,changeStatusTo:boolean){
        const nft:NftEntity = await this.nftRepository.findOne(input);
        if(nft.isTakenDown===changeStatusTo){
            if(changeStatusTo===true){throw new BadRequestException( "This NFT is already taken down" )}
            else{throw new BadRequestException( "This NFT is already activated" )}
        }
        return await this.nftRepository.save({...nft,isDeleted:changeStatusTo,isTakenDown:changeStatusTo});
    }

    async takeDownUser(input:string,changeStatusTo:boolean){
        const user:UserEntity = await this.userRepository.findOne(input);
        if(user.isTakenDown===changeStatusTo){
            if(changeStatusTo===true){throw new BadRequestException( "This user is already taken down" )}
            else{throw new BadRequestException( "This user is already activated" )}
        }
        return await this.userRepository.save({...user,isTakenDown:changeStatusTo});
    }

    async viewAllUsers(){
        return await this.userRepository.find({where:{username:Not("")}})
    }

    async viewAllNft(){
        return await this.nftRepository.find({where:{title:Not("")}})
    }
}
