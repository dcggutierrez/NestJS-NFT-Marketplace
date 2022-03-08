import { Field, ObjectType } from "@nestjs/graphql";
import { IsObject } from "class-validator";
import { UserDetailsOutput } from "src/modules/user/dto/user-details.output";

@ObjectType()
export class WalletOutput{
    
    @Field({name:"walletId"})
    id:string;

    @Field({name:"remainingBalance"})
    balance:number;

    @Field({name:"owner"})
    @IsObject()
    user:UserDetailsOutput;
}