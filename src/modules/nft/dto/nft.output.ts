import { Field, ObjectType } from "@nestjs/graphql";
import { IsArray, IsObject } from "class-validator";
import { CategoryEnum } from "src/common/category.enum";
import { CommentOutput } from "src/modules/comment/dto/comment.output";
import { CommentEntity } from "src/modules/comment/entity/comment.entity";
import { UserDetailsOutput } from "src/modules/user/dto/user-details.output";
import { UserEntity } from "src/modules/user/entity/user.entity";

@ObjectType()
export class NftOutput{

    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    imageUrl: string;

    @Field()
    description: string;

    @Field()
    category: CategoryEnum;

    @Field()
    price: number;

    @Field()
    @IsObject()
    owner: UserDetailsOutput;

    @Field()
    @IsObject()
    creator: UserDetailsOutput;

    @Field()
    isDeleted: boolean;

    @Field()
    isForSale: boolean;

    @Field()
    isTakenDown: boolean;

    @Field(()=>[CommentOutput])
    comment:CommentOutput;

}