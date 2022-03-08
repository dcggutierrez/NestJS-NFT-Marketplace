import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEnum } from 'src/common/category.enum';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { CommentEntity } from '../comment/entity/comment.entity';
import { NftEntity } from '../nft/entity/nft.entity';
import { NftRepository } from '../nft/nft.repository';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { AdminService } from './admin.service';

const mockNftRepository = () => ({
  save:jest.fn(),
  findOne:jest.fn()
})
const mockUserRepository = () => ({
  save:jest.fn(),
  findOne:jest.fn()
})

describe('AdminService', () => {
  let service: AdminService;
  let userRepository;
  let nftRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService,
      {provide:NftRepository,useFactory:mockNftRepository},
      {provide:UserRepository,useFactory:mockUserRepository}],
    }).compile();

    service = module.get<AdminService>(AdminService);
    nftRepository = module.get<NftRepository>(NftRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  const nftEntity:NftEntity = {
    title: 'SLP',
    imageUrl: 'www.slp.com',
    description: 'Smooth Love Potion',
    category: CategoryEnum.GameObject,
    price: 1000,
    isDeleted: false,
    isForSale: false,
    isTakenDown: false,
    creator: new UserEntity,
    owner: new UserEntity,
    comment: new CommentEntity,
    id: '52d9b453-999e-4de2-b2d4-de99941ceb43'
  }

  const userEntity:UserEntity = {
    username: 'Dustine',
    firstName: 'Dustine',
    lastName: 'Gutierrez',
    email: 'dcliffggutierrez@gmail.com',
    gender: GenderEnum.Male,
    password: '123456789',
    role: RoleEnum.User,
    isTakenDown: false,
    createdNft: new NftEntity,
    ownedNft: new NftEntity,
    comment: new CommentEntity,
    id: '71636d6a-5139-4a5e-b764-b775523751e8'
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('takeDownNft', () => {
    it('calls nftRepository.findOne and returns result', async () => {
      await nftRepository.findOne.mockResolvedValue(nftEntity);
      await nftRepository.save.mockResolvedValue({...nftEntity,isDeleted:true,isTakenDown:true});
      const result = await service.takeDownNft(nftEntity.id,true);
      expect(result).toEqual({...nftEntity,isDeleted:true,isTakenDown:true});
    });
  });
  describe('takeDownUser', () => {
    it('calls userRepository.findOne and returns result', async () => {
      await userRepository.findOne.mockResolvedValue(userEntity)
      await userRepository.save.mockResolvedValue({...userEntity,isTakenDown:true})
      const result = await service.takeDownUser(userEntity.id,true)
      expect(result).toEqual({...userEntity,isTakenDown:true});
    })
  })
});
