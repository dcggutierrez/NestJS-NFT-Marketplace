import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftRepository } from '../nft/nft.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([NftRepository,
                              UserRepository
  ])],
  providers: [AdminResolver, AdminService]
})
export class AdminModule {}
