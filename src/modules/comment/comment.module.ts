import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { NftRepository } from '../nft/nft.repository';

@Module({
  imports:[TypeOrmModule.forFeature([CommentRepository,
                                    UserRepository,
                                    NftRepository
                                   ])],
  providers: [CommentResolver, CommentService],
  exports:[CommentService]
})
export class CommentModule {}
