import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsEmail , IsEnum, Length, MaxLength } from "class-validator";
import { GenderEnum } from "src/common/gender.enum";


@InputType()
export class UpdateProfileInput{

    @Field({nullable:true})
    @IsAlpha()
    @Length(1, 50)
    firstName: string;

    @Field({nullable:true})
    @IsAlpha()
    @Length(1, 50)
    lastName: string;

    @Field({nullable:true})
    @IsEmail()
    @MaxLength(50)
    email: string;

    @Field(() => GenderEnum,{nullable:true})
    @IsEnum(GenderEnum)
    gender: GenderEnum;

}