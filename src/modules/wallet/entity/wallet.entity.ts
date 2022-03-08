import { Strategy } from "passport-jwt";
import { BaseEntity } from "src/common/base.entity";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('wallet')
export class WalletEntity extends BaseEntity{
    
    @Column({type:'numeric',precision:18,scale:8,default:0})
    balance: number;

    @OneToOne(()=>UserEntity,{eager:true})
    @JoinColumn()
    user: UserEntity;

}