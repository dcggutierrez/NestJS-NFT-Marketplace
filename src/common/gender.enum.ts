import { registerEnumType } from "@nestjs/graphql";
export enum GenderEnum{
    Male = 'Male',
    Female = 'Female'
}

registerEnumType(GenderEnum,{name:'GenderEnum', description: 'Gender'});