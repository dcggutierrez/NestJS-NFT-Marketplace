import { BaseEntity } from 'src/common/base.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { CommentEntity } from 'src/modules/comment/entity/comment.entity';
import { NftEntity } from 'src/modules/nft/entity/nft.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ nullable:false })
  firstName: string;

  @Column({ nullable:false })
  lastName: string;

  @Column({ unique: true , nullable:false })
  email: string;

  @Column({ nullable:false })
  gender: GenderEnum;

  @Column({ nullable:false })
  password: string;

  @Column({ nullable:false })
  role: RoleEnum;

  @Column({default:false})
  isTakenDown: boolean;

  @OneToMany(()=>NftEntity, nft => nft.creator)
  createdNft:NftEntity;

  @OneToMany(()=>NftEntity, nft => nft.owner)
  ownedNft:NftEntity;

  @OneToMany(()=>CommentEntity,comment => comment.author)
  comment:CommentEntity
}
