import { BaseEntity } from "src/common/base.entity";
import { NftEntity } from "src/modules/nft/entity/nft.entity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";


@Entity('comment')
export class CommentEntity extends BaseEntity{

    @Column()
    comment:string;

    @Column({default:false})
    isDeleted:boolean;

    @ManyToOne(()=> NftEntity, nft => nft.comment,{eager:true})
    nft:NftEntity;

    @ManyToOne(()=> UserEntity,user=> user.comment,{eager:true})
    author:UserEntity
}