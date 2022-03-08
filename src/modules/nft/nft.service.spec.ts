import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from './nft.service';
import { NftRepository } from './nft.repository';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from '../wallet/wallet.repository';
import { WalletService } from '../wallet/wallet.service';
import { CommentService } from '../comment/comment.service';
import { UserEntity } from '../user/entity/user.entity';
import { NftEntity } from './entity/nft.entity';
import { CommentEntity } from '../comment/entity/comment.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { CategoryEnum } from 'src/common/category.enum';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { NftInput } from './dto/nft.inputs';
import { find } from 'rxjs';
import { WalletEntity } from '../wallet/entity/wallet.entity';
import { NftOutput } from './dto/nft.output';

const mockNftRepository = () => ({
  save:jest.fn(),
  find:jest.fn(),
  findOne:jest.fn()
})
const mockUserRepository = () => ({
  findOne:jest.fn(),
})
const mockWalletRepository = () => ({
  findByUserId:jest.fn(),
})
const mockWalletService = () => ({
  withdrawBalance:jest.fn(),
  depositBalance:jest.fn()
})
const mockCommentService = () => ({
  viewNftComment:jest.fn(),
})

describe('NftService', () => {
  let service: NftService;
  let nftRepository;
  let userRepository;
  let walletRepository;
  let walletService;
  let commentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService,
      {provide:NftRepository,useFactory:mockNftRepository},
      {provide:UserRepository,useFactory:mockUserRepository},
      {provide:WalletRepository,useFactory:mockWalletRepository},
      {provide:WalletService,useFactory:mockWalletService},
      {provide:CommentService,useFactory:mockCommentService},],
    }).compile();

    service = module.get<NftService>(NftService);
    nftRepository = module.get<NftRepository>(NftRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    walletRepository = module.get<WalletRepository>(WalletRepository);
    walletService = module.get<WalletService>(WalletService);
    commentService = module.get<CommentService>(CommentService); 
  });

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

  const sellNftEntity:NftEntity = {
    title: 'SLP',
    imageUrl: 'www.slp.com',
    description: 'Smooth Love Potion',
    category: CategoryEnum.GameObject,
    price: 1000,
    isDeleted: false,
    isForSale: false,
    isTakenDown: false,
    creator: new UserEntity,
    owner: userEntity,
    comment: new CommentEntity,
    id: '52d9b453-999e-4de2-b2d4-de99941ceb43'
  }

  const userDetailOutput:UserDetailsOutput = {
    id: '71636d6a-5139-4a5e-b764-b775523751e8',
    username: 'Dustine',
    firstName: 'Dustine',
    lastName: 'Gutierrez',
    email: 'dcliffggutierrez@gmail.com',
    gender: GenderEnum.Male,
    role: RoleEnum.Admin,
    isTakenDown: false
  }

  const nftInput:NftInput = {
    title: 'SLP',
    imageUrl: 'www.slp.com',
    description: 'Smooth Love Potion',
    category: CategoryEnum.GameObject,
    price: 1000
  }

  const commentEntity:CommentEntity[] =[{
    comment: 'Nice',
    isDeleted: false,
    nft: new NftEntity,
    author: new UserEntity,
    id: '52d9b453-999e-4de2-b2d4-de99941ceb43'
  }];

  const walletEntity:WalletEntity = {
    balance: 10000,
    user: new UserEntity,
    id: '52d9b453-999e-4de2-b2d4-de99941ceb43'
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('PostNft', () => {
    it('calls UserRepository.findOne and NftRepository.save and return the result', async () => {
        await userRepository.findOne.mockResolvedValue(userEntity);
        await nftRepository.save.mockResolvedValue(nftEntity);
        const result = await service.postNft(userDetailOutput,nftInput);
        expect(result).toEqual(nftEntity)
    });
  });
  describe('SearchNftSimple', () => {
    it('calls NftRepository.find and return the result', async () => {
      await nftRepository.find.mockResolvedValue(nftEntity);
      const result = await service.searchNftSimple("","",10,0);
      expect(result).toEqual(nftEntity);
    });
  });
  describe('viewNftDetails', () => {
    it('calls nftEntity.findOne and commentService.viewNftComment and return the result', async () => {
      await nftRepository.findOne.mockResolvedValue(nftEntity);
      await commentService.viewNftComment.mockResolvedValue(commentEntity);
      const result = await service.viewNftDetails("",10,0)
      expect(result).toEqual({
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
          comment: commentEntity,
          id: '52d9b453-999e-4de2-b2d4-de99941ceb43',
          creatorId:nftEntity.creator.id,
          creatorName:nftEntity.creator.firstName+" "+nftEntity.creator.lastName,
          ownerId:nftEntity.owner.id,
          ownerName:nftEntity.owner.firstName+" "+nftEntity.owner.lastName,
      });
    });
  });
  describe('BuyNft', () => {
    it('calls nftRepository.findOne, walletRepository.findByUserId, and userRepository.findOne and return the result', async () => {
      await nftRepository.findOne.mockResolvedValue({...nftEntity,isForSale:true});
      await walletRepository.findByUserId.mockResolvedValue(walletEntity);
      await userRepository.findOne.mockResolvedValue(userEntity);
      await walletService.withdrawBalance.mockResolvedValue(walletEntity);
      await walletService.depositBalance.mockResolvedValue(walletEntity);
      await nftRepository.save.mockResolvedValue(nftEntity);
      await walletRepository.findByUserId.mockResolvedValue(walletEntity);
      await userRepository.findOne.mockResolvedValue(userDetailOutput);
      const result = await service.buyNft(userDetailOutput,'52d9b453-999e-4de2-b2d4-de99941ceb43');
      expect(result).toEqual({
        ...nftEntity,
        isForSale:true,
        buyer:walletEntity.user,
        seller:userDetailOutput,
        balance:walletEntity.balance,
      })
    });
  });
  describe('SellNft', () => {
    it('calls nftRepository.findOne and return the result', async () => {
      await nftRepository.findOne.mockResolvedValue(sellNftEntity);
      await nftRepository.save.mockResolvedValue(sellNftEntity);
      const result = await service.sellNft(userDetailOutput,'52d9b453-999e-4de2-b2d4-de99941ceb43',true);
      expect(result).toEqual(sellNftEntity);
    });
  });
  describe('DeleteNft', () => {
    it('calls nftRepository and return the result', async () => {
      await nftRepository.findOne.mockResolvedValue(sellNftEntity);
      await nftRepository.save.mockResolvedValue(sellNftEntity);
      const result = await service.deleteNft(userDetailOutput,'52d9b453-999e-4de2-b2d4-de99941ceb43',true);
      expect(result).toEqual(sellNftEntity);
    })
  })
});