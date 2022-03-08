import { Module } from '@nestjs/common';
import { NftResolver } from './nft.resolver';
import { NftService } from './nft.service';
import { NftRepository } from './nft.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../comment/entity/comment.entity';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from '../wallet/wallet.repository';
import { WalletService } from '../wallet/wallet.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { CommentModule } from '../comment/comment.module';
import { CommentRepository } from '../comment/comment.repository';


@Module({
  imports:[
    TypeOrmModule.forFeature([
                              NftRepository,
                              UserRepository,
                              WalletRepository,
                              CommentRepository
                            ]), 
    WalletModule,
    UserModule,
    CommentModule
  ],
  providers: [
    NftResolver,
    NftService, 
  ],
  exports:[
  ]
})
export class NftModule {}
