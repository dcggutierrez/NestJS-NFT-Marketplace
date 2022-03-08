import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentOutput{
  
    @Field()
    id:string;

    @Field()
    comment:string;

    @Field()
    authorId:string;

    @Field()
    author:string;

    @Field()
    createdAt:Date;

    @Field()
    isDeleted:boolean;
}