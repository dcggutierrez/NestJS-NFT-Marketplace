import { Field, ObjectType } from "@nestjs/graphql";
import { NftOutput } from "src/modules/nft/dto/nft.output";
import { UserDetailsOutput } from "src/modules/user/dto/user-details.output";

@ObjectType()
export class PostCommentOutput{
    
    @Field()
    id: string;

    @Field()
    createdAt: Date;

    @Field()
    comment: string;

    @Field()
    nft:NftOutput;

    @Field()
    author:UserDetailsOutput;

    @Field()
    isDeleted:boolean;

}