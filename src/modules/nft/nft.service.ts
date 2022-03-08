import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { query } from 'express';
import { Between, Equal, ILike, Like , Not } from 'typeorm';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from '../comment/entity/comment.entity';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { WalletEntity } from '../wallet/entity/wallet.entity';
import { WalletRepository } from '../wallet/wallet.repository';
import { WalletService } from '../wallet/wallet.service';
import { NftSearchInput } from './dto/nft-search.input';
import { NftInput } from './dto/nft.inputs';
import { NftEntity } from './entity/nft.entity';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
    constructor(
        private readonly nftRepository:NftRepository,
        private readonly userRepository:UserRepository,
        private readonly walletRepository:WalletRepository,
        private readonly walletService:WalletService,
        private readonly commentService:CommentService
        ){}

    async postNft(user:UserDetailsOutput,input:NftInput){
        const userEntity:UserEntity = await this.userRepository.findOne(user.id);
        return await this.nftRepository.save({
            ...input,
            creator:userEntity,
            owner:userEntity,
            ownerName:userEntity.firstName+" "+userEntity.lastName
        });
    }

    async searchNftAdvance(userId:string,search:NftSearchInput,take:number,skip:number){
        var query;
        switch(search.owned){
            case "Owned": query = Equal(userId)
                break;
            case "NotOwned": query = Not(userId)
                break;
            default: query= Not("00000000-0000-0000-0000-000000000000")
        }
         return await this.nftRepository.find({
            where:  {
                        owner:Not("00000000-0000-0000-0000-000000000000"),
                        title:Like('%'+search.title+'%'),
                        category:Like('%'+search.category+'%'),
                        price:Between(search.priceFloor,search.priceCeiling),
                        isDeleted:false
                    },
            order: {
                        createdAt:search.dateOrder,
                        title:search.titleOrder,
                        price:search.priceOrder
                    },
            take: take,
            skip: skip*take
        })
    }

    async searchNftSimple(userId:string,search:string,take:number,skip:number){
        const query1 = Not("00000000-0000-0000-0000-000000000000");
        return await this.nftRepository.find({
            where:  [
                        {title:Like('%'+search+'%'),owner:query1,isDeleted:false},
                        {category:Like('%'+search+'%'),owner:query1,isDeleted:false},
                        {description:Like('%'+search+'%'),owner:query1,isDeleted:false},
            ],
            order: {
                        createdAt:-1,
                        title:-1,
                        price:-1,
                    },
            take: take,
            skip: skip*take
        })
    }

    async returnUserNft(userId:string,take:number,skip:number){
        return await this.nftRepository.find({
            where:{owner:userId},
            order:{createdAt:-1},
            take:take,
            skip:skip*take
        })
    }

    async viewNftDetails(input:string,take:number,skip:number){
        const nftEntity:NftEntity = await this.nftRepository.findOne(input);
        const comment:CommentEntity[] = await this.commentService.viewNftComment(input,take,skip);
        return {
            ...nftEntity,
            creatorId:nftEntity.creator.id,
            creatorName:nftEntity.creator.firstName+" "+nftEntity.creator.lastName,
            ownerId:nftEntity.owner.id,
            ownerName:nftEntity.owner.firstName+" "+nftEntity.owner.lastName,
            comment:comment
        }    
    }

    async buyNft(user:UserDetailsOutput,input:string){
        const soldNft:NftEntity = await this.nftRepository.findOne(input);
        const buyerWallet:WalletEntity = await this.walletRepository.findByUserId(user.id);
        const buyerEntity:UserEntity = await this.userRepository.findOne(user.id);

        if(soldNft === undefined){
            throw new BadRequestException( "This NFT doesn't exist");
        };

        if(user.id === soldNft.owner.id ){ 
            throw new UnauthorizedException( "You own this Nft" );
        };

        if(+buyerWallet.balance<+soldNft.price){
            throw new BadRequestException( "You dont have enough balance" );
        };

        if(soldNft.isForSale===false){
            throw new UnauthorizedException( "This NFT is not for sale" );
        };

        if(soldNft.isDeleted===true){
            throw new UnauthorizedException( "This NFT is not available" );
        };

        await this.walletService.withdrawBalance(user.id,soldNft.price);
        await this.walletService.depositBalance(soldNft.owner.id,soldNft.price);
        const nft:NftEntity = await this.nftRepository.save({id:soldNft.id,owner:buyerEntity,isForSale:false});
        const wallet:WalletEntity = await this.walletRepository.findByUserId(user.id);
        const seller:UserDetailsOutput = await this.userRepository.findOne(soldNft.owner.id);
        return {...soldNft,
            buyer:wallet.user,
            seller:seller,
            balance:wallet.balance
        };
    }

    async sellNft(user:UserDetailsOutput,input:string,changeStatusTo:boolean){
        const nft:NftEntity = await this.nftRepository.findOne(input);

        if(user.id !== nft.owner.id ){
             throw new UnauthorizedException( "You don't own this Nft" )
        };

        if(nft.isDeleted===true){
             throw new BadRequestException( "This NFT is deleted" )
        };

        if(nft.isForSale===changeStatusTo){

            if(changeStatusTo===true){
                throw new BadRequestException( "This NFT is already for sale" )
            }

            else{
                throw new BadRequestException( "This NFT is already not for sale" )
            };
        };

        return await this.nftRepository.save({...nft,isForSale:changeStatusTo});
    }

    async deleteNft(user:UserDetailsOutput,input:string,changeStatusTo:boolean){
        const nft:NftEntity = await this.nftRepository.findOne(input);

        if(nft.isTakenDown===true){
             throw new UnauthorizedException( "This NFT is taken down by admin" )
        };

        if(user.id !== nft.owner.id ){ 
            throw new UnauthorizedException( "You don't own this Nft" )
        };

        if(nft.isDeleted===changeStatusTo){
            if(changeStatusTo===true){
            throw new BadRequestException( "This NFT is already deleted" )
            }

            else{
                throw new BadRequestException( "This NFT is already not deleted" )
            };
        };

        return await this.nftRepository.save({...nft,isDeleted:changeStatusTo});
    }

}
