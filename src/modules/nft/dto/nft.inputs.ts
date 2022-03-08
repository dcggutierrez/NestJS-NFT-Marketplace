import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsUrl, Length } from "class-validator";
import { CategoryEnum } from "src/common/category.enum";

@InputType()
export class NftInput{


    @Field()
    @IsNotEmpty()
    @Length(1,100)
    title: string;

    @Field()
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;

    @Field()
    @IsNotEmpty()
    @Length(1,500)
    description: string;

    @Field(()=>CategoryEnum)
    @IsNotEmpty()
    @IsEnum(CategoryEnum)
    category: CategoryEnum;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;
    
}