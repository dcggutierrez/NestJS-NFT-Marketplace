import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsAlphanumeric, IsEmail, IsEnum, IsOptional, Length, Matches, MaxLength } from "class-validator";
import { GenderEnum } from "src/common/gender.enum";
import { RoleEnum } from "src/common/roles.enum";

@InputType()
export class RegisterInput{

    @Field({nullable:true})
    @IsAlphanumeric()
    @Length(4,30)
    username: string;

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

    @Field({nullable:true})
    @Length(6, 30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak.',
    })
    password: string;

    @Field(() => RoleEnum,{nullable:true})
    @IsEnum(RoleEnum)
    role: RoleEnum;
}