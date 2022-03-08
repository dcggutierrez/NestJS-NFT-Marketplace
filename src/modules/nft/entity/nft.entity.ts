import { BaseEntity } from "src/common/base.entity";
import { CategoryEnum } from "src/common/category.enum";
import { CommentEntity } from "src/modules/comment/entity/comment.entity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity('nft')
export class NftEntity extends BaseEntity{
    
    @Column()
    title: string;

    @Column()
    imageUrl: string;

    @Column()
    description: string;

    @Column()
    category: CategoryEnum;

    @Column({type:'numeric',precision:18,scale:8,default:0})
    price: number;

    @Column({ default:false })
    isDeleted: boolean;

    @Column({ default:false})
    isForSale: boolean;

    @Column({ default:false })
    isTakenDown: boolean;

    @ManyToOne(()=> UserEntity, user => user.createdNft,{eager:true})
    creator:UserEntity;

    @ManyToOne(()=> UserEntity, user => user.ownedNft,{eager:true})
    owner:UserEntity;
    
    @OneToMany(()=>CommentEntity, comment  => comment.nft)
    comment:CommentEntity;
}