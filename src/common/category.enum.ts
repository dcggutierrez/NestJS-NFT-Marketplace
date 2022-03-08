import { registerEnumType } from "@nestjs/graphql";
export enum CategoryEnum{
    Art = 'Art',
    Music = 'Music',
    Memes = 'Memes',
    GameObject = 'Games Objects',
    All = ''
}

registerEnumType(CategoryEnum,{name:'CategoryEnum', description: 'Category'});