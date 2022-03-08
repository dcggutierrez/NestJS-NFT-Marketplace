import { Field, ObjectType } from "@nestjs/graphql";
import { IsObject } from "class-validator";
import { FILE } from "dns";
import { CategoryEnum } from "src/common/category.enum";
import { UserDetailsOutput } from "src/modules/user/dto/user-details.output";
import { UserEntity } from "src/modules/user/entity/user.entity";

@ObjectType()
export class SoldNftOutput{

    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    category:CategoryEnum;

    @Field()
    imageUrl:string;

    @Field()
    description: string;

    @Field()
    price: number;   

    @Field()
    @IsObject()
    buyer: UserDetailsOutput;

    @Field()
    @IsObject()
    seller: UserDetailsOutput;

    @Field()
    balance: number;

}