import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GqlAuth } from '../auth/guards/auth.guard';
import { Roles } from 'src/common/roles.decorator';
import { RoleEnum } from 'src/common/roles.enum';
import { AdminService } from './admin.service';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { NftOutput } from '../nft/dto/nft.output';

@Resolver()
export class AdminResolver {
    constructor(private readonly adminService: AdminService){}

    @UseGuards(GqlAuth)
    @Roles(RoleEnum.Admin)
    @Mutation(()=>NftOutput)
    takeDownNft(
        @Args('input')input:string,
        @Args('delete')changeStatusTo:boolean){
        return this.adminService.takeDownNft(input,changeStatusTo);
    }

    @UseGuards(GqlAuth)
    @Roles(RoleEnum.Admin)
    @Mutation(()=>UserDetailsOutput)
    takeDownUser(
        @Args('input')input:string,
        @Args('delete')changeStatusTo:boolean){
        return this.adminService.takeDownUser(input,changeStatusTo);
    }

    @UseGuards(GqlAuth)
    @Roles(RoleEnum.Admin)
    @Query(()=>[NftOutput])
    viewAllNft(){
        return this.adminService.viewAllNft();
    }

    @UseGuards(GqlAuth)
    @Roles(RoleEnum.Admin)
    @Query(()=>[UserDetailsOutput])
    viewAllUsers(){
        return this.adminService.viewAllUsers();
    }
    
}
