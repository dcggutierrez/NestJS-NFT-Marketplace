import { registerEnumType } from "@nestjs/graphql";
export enum OwnershipEnum{
    Owned = "Owned",
    NotOwned = "NotOwned",
    All = ""
}

registerEnumType(OwnershipEnum,{name:'OwnershipEnum', description: 'Ownership'});