import { Get, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { GqlAuth } from '../auth/guards/auth.guard';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { WalletInput } from './dto/wallet.input';
import { WalletOutput } from './dto/wallet.output';
import { WalletService } from './wallet.service';

@Resolver(()=>(WalletOutput))
export class WalletResolver {

    constructor(private readonly walletService:WalletService){}

    @UseGuards(GqlAuth)
    @Query(()=>WalletOutput)
    checkBalance(@GetUser() user:UserDetailsOutput){
        return this.walletService.checkBalance(user.id);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>WalletOutput)
    depositBalance(@GetUser() user:UserDetailsOutput,@Args('balance')balance:WalletInput){
        return this.walletService.depositBalance(user.id,balance.balance);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>WalletOutput)
    withdrawBalance(@GetUser() user:UserDetailsOutput,@Args('balance')balance:WalletInput){
        return this.walletService.withdrawBalance(user.id,balance.balance);
    }

    

}