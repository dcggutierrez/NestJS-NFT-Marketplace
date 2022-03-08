import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, Length } from "class-validator";

@InputType()
export class LoginInput{
    @Field()
    @IsAlphanumeric()
    @Length(4, 30)
    username: string;
  
    @Field()
    @Length(6, 30)
    password: string;
}