import { registerEnumType } from "@nestjs/graphql";
export enum OrderEnum{
    ASC = 1,
    DESC = -1
}

registerEnumType(OrderEnum,{name:'OrderEnum', description: 'Order'});