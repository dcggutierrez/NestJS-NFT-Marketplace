import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { UserRepository } from '../user/user.repository';
import { NftRepository } from '../nft/nft.repository';
import { CommentEntity } from './entity/comment.entity';
import { UserEntity } from '../user/entity/user.entity';
import { GenderEnum } from 'src/common/gender.enum';
import { RoleEnum } from 'src/common/roles.enum';
import { NftEntity } from '../nft/entity/nft.entity';
import { CategoryEnum } from 'src/common/category.enum';

const mockCommentRepository = () => ({
  find:jest.fn(),
  save:jest.fn(),
  findOne:jest.fn()
})
const mockUserRepository = () => ({
  findOne:jest.fn(),
})
const mockNftRepository = () => ({
  findOne:jest.fn(),
})

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository;
  let userRepository;
  let nftRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService,
      {provide:CommentRepository,useFactory:mockCommentRepository},
      {provide:UserRepository,useFactory:mockUserRepository},
      {provide:NftRepository,useFactory:mockNftRepository},],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    nftRepository = module.get<NftRepository>(NftRepository);
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
    creator: userEntity,
    owner: userEntity,
    comment: new CommentEntity,
    id: '52d9b453-999e-4de2-b2d4-de99941ceb43'
  }

  const commentEntity1:CommentEntity = {
    comment: 'Yes',
    isDeleted: false,
    nft: nftEntity,
    author:userEntity,
    id: '59d9ebe8-b019-473c-bfd1-fbc002a9262e'
  }

  const commentEntity2:CommentEntity = {
    comment: 'Yes',
    isDeleted: false,
    nft: nftEntity,
    author:userEntity,
    id: '7c2de3a0-2a8d-42b9-be73-d2f742ed003a'
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('viewUserComment', () => {
    it('calls commentRepository.find and returns the result', async () => {
      await commentRepository.find.mockResolvedValue([commentEntity1,commentEntity2]);
      const result = await service.viewUserComment('71636d6a-5139-4a5e-b764-b775523751e8',10,0)
      expect(result).toEqual([
        {
          id:'59d9ebe8-b019-473c-bfd1-fbc002a9262e',
          isDeleted:false,
          createdAt:undefined,
          authorId:'71636d6a-5139-4a5e-b764-b775523751e8',
          author:'Dustine Gutierrez',
          comment:'Yes'
        },{
          id:'7c2de3a0-2a8d-42b9-be73-d2f742ed003a',
          isDeleted:false,
          createdAt:undefined,
          authorId:'71636d6a-5139-4a5e-b764-b775523751e8',
          author:'Dustine Gutierrez',
          comment:'Yes'
        }]);
    });
  });
  describe('viewNftComment', () => {
    it('calls commentRepository.find and returns the result', async () => {
      await commentRepository.find.mockResolvedValue([commentEntity1,commentEntity2]);
      const result = await service.viewNftComment('71636d6a-5139-4a5e-b764-b775523751e8',10,0)
      expect(result).toEqual([
        {
          id:'59d9ebe8-b019-473c-bfd1-fbc002a9262e',
          isDeleted:false,
          createdAt:undefined,
          authorId:'71636d6a-5139-4a5e-b764-b775523751e8',
          author:'Dustine Gutierrez',
          comment:'Yes'
        },{
          id:'7c2de3a0-2a8d-42b9-be73-d2f742ed003a',
          isDeleted:false,
          createdAt:undefined,
          authorId:'71636d6a-5139-4a5e-b764-b775523751e8',
          author:'Dustine Gutierrez',
          comment:'Yes'
        }]);
    }); 
  });
  describe('postComment', () => {
    it('calls commentRepository.save and returns the result', async () => {
      await userRepository.findOne.mockResolvedValue(userEntity);
      await nftRepository.findOne.mockResolvedValue(nftEntity);
      await commentRepository.save.mockResolvedValue({
        comment:'Yes',
        nft:nftEntity,
        author:userEntity
      });
      const result = await service.postComment(userEntity.id,nftEntity.id,{comment:'Yes'})
      expect(result).toEqual({
        comment:'Yes',
        nft:nftEntity,
        author:userEntity
      });
    });
  });
  describe('updateComment', () => {
    it('calls commentRepository.findOne and commentRepository.save and returns result', async () => {
      await commentRepository.findOne.mockResolvedValue(commentEntity1);
      await commentRepository.save.mockResolvedValue({...commentEntity1,comment:'Nice'});
      const result = await service.updateComment(userEntity.id,commentEntity1.id,{comment:'Nice'});
      expect(result).toEqual({...commentEntity1,comment:'Nice'})
    });
  });
  describe('deleteComment', () => {
    it('calls commentRepository.findOne and commentRepository.save and returns result', async () => {
      await commentRepository.findOne.mockResolvedValue(commentEntity1);
      await commentRepository.save.mockResolvedValue({...commentEntity1,isDeleted:true});
      const result = await service.deleteComment(userEntity.id,commentEntity1.id,true);
      expect(result).toEqual({...commentEntity1,isDeleted:true})
    });
  });
});
