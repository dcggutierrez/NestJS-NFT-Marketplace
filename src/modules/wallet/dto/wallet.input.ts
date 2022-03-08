import { Field, InputType } from "@nestjs/graphql";
import { IsDefined, IsInstance, IsNotEmpty, IsNumber, IsObject, IsPositive, Length } from "class-validator";
import { UserEntity } from "src/modules/user/entity/user.entity";;

@InputType()
export class WalletInput{

    @Field({nullable:false})
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    balance: number;

}