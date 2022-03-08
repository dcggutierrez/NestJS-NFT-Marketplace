import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { GqlAuth } from '../auth/guards/auth.guard';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { CommentService } from './comment.service';
import { CommentInput } from './dto/comment.input';
import { CommentOutput } from './dto/comment.output';
import { PostCommentOutput } from './dto/post-comment.output';

@Resolver()
export class CommentResolver {

    constructor(private readonly commentService:CommentService){}

    @UseGuards(GqlAuth)
    @Query(()=>[CommentOutput])
    viewUserComments(
        @GetUser('user')user:UserDetailsOutput,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
        return this.commentService.viewUserComment(user.id,take,skip);
    }

    @UseGuards(GqlAuth)
    @Query(()=>[CommentOutput])
    viewNftComments(
        @Args('nft')nft:string,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
        return this.commentService.viewNftComment(nft,take,skip);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>PostCommentOutput)
    postComment(
        @GetUser('user')user:UserDetailsOutput,
        @Args('nft')nft:string,
        @Args('comment')comment:CommentInput){
        return this.commentService.postComment(user.id,nft,comment);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>PostCommentOutput)
    updateComment(
        @GetUser('user')user:UserDetailsOutput,
        @Args('commentId')commentId:string,
        @Args('comment')comment:CommentInput){
        return this.commentService.updateComment(user.id,commentId,comment);
        }

    @UseGuards(GqlAuth)
    @Mutation(()=>PostCommentOutput)
    deleteComment(
        @GetUser('user')user:UserDetailsOutput,
        @Args('comment')comment:string,
        @Args('delete')changeStatusTo:boolean){
        return this.commentService.deleteComment(user.id,comment,changeStatusTo);
        }
}
