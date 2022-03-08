import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class CommentInput{

    @Field()
    @IsNotEmpty()
    @Length(1,500)
    comment:string;
}