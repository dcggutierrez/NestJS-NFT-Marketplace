import { Get, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { GqlAuth } from '../auth/guards/auth.guard';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { NftSearchInput } from './dto/nft-search.input';
import { NftInput } from './dto/nft.inputs';
import { NftOutput } from './dto/nft.output';
import { SoldNftOutput } from './dto/sold-nft.output';
import { NftService } from './nft.service';

@Resolver()
export class NftResolver {
    constructor(private readonly nftService:NftService){}

    @UseGuards(GqlAuth)
    @Mutation(()=>NftOutput)
    postNft(@GetUser('user') user:UserDetailsOutput,@Args('input') input:NftInput){
        return this.nftService.postNft(user,input);
    }

    @UseGuards(GqlAuth)
    @Query(()=>[NftOutput])
    returnUserNft(
        @GetUser('user')user:UserDetailsOutput,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
            const userId:string = user.id;
            return this.nftService.returnUserNft(userId,take,skip);
        }

    @UseGuards(GqlAuth)
    @Query(()=>[NftOutput])
    searchNftAdvance(
        @GetUser('user')user:UserDetailsOutput,
        @Args('search')search:NftSearchInput,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
            const userId:string = user.id;
            return this.nftService.searchNftAdvance(userId,search,take,skip);
        }

    @UseGuards(GqlAuth)
    @Query(()=>[NftOutput])
    searchNftSimple(
        @GetUser('user')user:UserDetailsOutput,
        @Args('search',{defaultValue:""})search:string,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
            const userId:string = user.id;
            return this.nftService.searchNftSimple(userId,search,take,skip);
        }

    @UseGuards(GqlAuth)
    @Query(()=>NftOutput)
    viewNft(
        @Args('input') input:string,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
        return this.nftService.viewNftDetails(input,take,skip);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>SoldNftOutput)
    buyNft(@GetUser('user')user:UserDetailsOutput,@Args('input')input:string){
        return this.nftService.buyNft(user,input);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>NftOutput)
    sellNft(
        @GetUser('user')user:UserDetailsOutput,
        @Args('input')input:string,
        @Args('sell')changeStatusTo:boolean){
        return this.nftService.sellNft(user,input,changeStatusTo);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>NftOutput)
    deleteNft(
        @GetUser('user')user:UserDetailsOutput,
        @Args('input')input:string,
        @Args('delete')changeStatusTo:boolean){
        return this.nftService.deleteNft(user,input,changeStatusTo);
    }

}
