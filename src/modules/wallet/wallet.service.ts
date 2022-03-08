import { Injectable } from '@nestjs/common';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { UserEntity } from '../user/entity/user.entity';
import { WalletInput } from './dto/wallet.input';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {

    constructor(private readonly walletRepository:WalletRepository){}

    async checkBalance(id:string){
        return await this.walletRepository.findByUserId(id);
    }

    async depositBalance(id:string,balance:number){
        const initialWallet = await this.walletRepository.findByUserId(id);
        const amount = +balance + +initialWallet.balance;
        return await this.walletRepository.save({id:initialWallet.id,balance:amount});
    }

    async withdrawBalance(id:string,balance:number){
        const initialWallet = await this.walletRepository.findByUserId(id);
        const amount = +initialWallet.balance - +balance;
        return await this.walletRepository.save({id:initialWallet.id,balance:amount});
    }
}
