import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { NftEntity } from '../nft/entity/nft.entity';
import { NftRepository } from '../nft/nft.repository';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { CommentRepository } from './comment.repository';
import { CommentInput } from './dto/comment.input';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentService {
    
    constructor(
        private readonly commentRepository:CommentRepository,
        private readonly userRepository:UserRepository,
        private readonly nftRepository:NftRepository
        ){}

    async viewUserComment(user:string,take:number,skip:number){
        const comment = await this.commentRepository.find({
            where:{author:user},
            order:{createdAt:-1},
            take:take,
            skip:take*skip
        });
        var commentArray = [];
        comment.forEach((a)=>commentArray.push({
            id:a.id,
            createdAt:a.createdAt,
            isDeleted:a.isDeleted,
            authorId:a.author.id,
            author:a.author.firstName+" "+a.author.lastName,
            comment:a.comment}))
        return commentArray;
    }

    async viewNftComment(nft:String,take:number,skip:number){
        const comment = await this.commentRepository.find({
            where:{nft:nft,isDeleted:false},
            order:{createdAt:-1},
            take:take,
            skip:take*skip
        });
        var commentArray = [];
        comment.forEach((a)=>commentArray.push({
            id:a.id,
            createdAt:a.createdAt,
            isDeleted:a.isDeleted,
            authorId:a.author.id,
            author:a.author.firstName+" "+a.author.lastName,
            comment:a.comment}))
        return commentArray;
    }

    async postComment(user:string,nft:string,comment:CommentInput){
        const userEntity:UserEntity = await this.userRepository.findOne(user);
        const nftEntity:NftEntity = await this.nftRepository.findOne(nft);
        return await this.commentRepository.save({ comment:comment.comment , nft:nftEntity , author:userEntity });   
    }

    async updateComment(user:string,commentId:string,comment:CommentInput){
        const commentEntity:CommentEntity = await this.commentRepository.findOne(commentId);
        if(commentEntity.author.id !== user){
            throw new UnauthorizedException ( "You're not the author of this comment" );
        }
        return await this.commentRepository.save({...commentEntity,comment:comment.comment})
    }

    async deleteComment(user:string,commentId:string,changeStatusTo:boolean){
        const commentEntity:CommentEntity = await this.commentRepository.findOne(commentId);
        if(commentEntity.author.id !== user){
            throw new UnauthorizedException ( "You're not the author of this comment" );
        }
        return await this.commentRepository.save({...commentEntity,isDeleted:changeStatusTo})
    }
}
