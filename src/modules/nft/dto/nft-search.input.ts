import { All, Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, IsEnum, IsNumber, Length } from "class-validator";
import { CategoryEnum } from "src/common/category.enum";
import { OrderEnum } from "src/common/order.enum";
import { OwnershipEnum } from "src/common/ownership.enum";

@InputType()
export class NftSearchInput{

    @Field(()=>OwnershipEnum,{defaultValue:OwnershipEnum.All})
    @Optional()
    @IsEnum(OwnershipEnum)
    owned:OwnershipEnum;

    @Field({defaultValue:""})
    @Optional()
    @IsAlphanumeric()
    @Length(1,500)
    title:string;

    @Field(()=>CategoryEnum,{defaultValue:CategoryEnum.All})
    @Optional()
    @IsEnum(CategoryEnum)
    category:CategoryEnum;

    @Field({defaultValue:0})
    @Optional()
    @IsNumber()
    @Length(1,18)
    priceFloor:number;

    @Field({defaultValue:99999999})
    @Optional()
    @IsNumber()
    @Length(1,18)
    priceCeiling:number;

    @Field(()=>OrderEnum,{defaultValue:OrderEnum.ASC})
    @Optional()
    @IsEnum(OrderEnum)
    titleOrder:OrderEnum;

    @Field(()=>OrderEnum,{defaultValue:OrderEnum.ASC})
    @Optional()
    @IsEnum(OrderEnum)
    priceOrder:OrderEnum;

    @Field(()=>OrderEnum,{defaultValue:OrderEnum.ASC})
    @Optional()
    @IsEnum(OrderEnum)
    dateOrder:OrderEnum;
}