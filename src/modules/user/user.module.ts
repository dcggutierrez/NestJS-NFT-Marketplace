import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftEntity } from '../nft/entity/nft.entity';
import { WalletEntity } from '../wallet/entity/wallet.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([
                              UserRepository
                            ]),
    WalletEntity,
    NftEntity
  ],
  providers: [
    UserResolver, 
    UserService, 
  ],
  exports: [
    UserService, 
    TypeOrmModule.forFeature([UserRepository]),
  ]
})
export class UserModule {}
