import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { WalletRepository } from '../wallet/wallet.repository';
import { JwtService } from '@nestjs/jwt';
import { GenderEnum } from "src/common/gender.enum";
import { RoleEnum } from "src/common/roles.enum";
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entity/user.entity';
import { NftEntity } from '../nft/entity/nft.entity';
import { CommentEntity } from '../comment/entity/comment.entity';

const userEntity:UserEntity = {
  username: 'Dustine',
  firstName: 'Dustine',
  lastName: 'Gutierrez',
  email: 'dcliffggutierrez@gmail.com',
  gender: GenderEnum.Male,
  password: '$2b$10$bX6uDvHeEc/FogSEGHolBusTbZLjaf6auX14jSHSa0D909OhCjTf6',
  role: RoleEnum.Admin,
  isTakenDown: false,
  createdNft: new NftEntity,
  ownedNft: new NftEntity,
  comment: new CommentEntity,
  id: '71636d6a-5139-4a5e-b764-b775523751e8'
}

const registerInput = {
  username: 'Dustine',
  firstName: 'Dustine',
  lastName: 'Gutierrez',
  email: 'dcliffggutierrez@gmail.com',
  gender: GenderEnum.Male,
  password: '123456',
  role: RoleEnum.Admin
};

const loginInput = {
  username: 'Dustine',
  password: 'Dustine'
}

const mockUserRepository = () => ({
  findOne:jest.fn(),
  save:jest.fn(),
});
const mockWalletRepository = () => ({
  save:jest.fn()
});
const mockJwtService = () => ({
  sign:jest.fn()
});

describe('AuthService', () => {
  let service: AuthService;
  let repository;
  let wallet: WalletRepository;
  let jwt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide:UserRepository,useFactory:mockUserRepository},
        {provide:WalletRepository,useFactory:mockWalletRepository},
        {provide:JwtService,useFactory:mockJwtService},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<UserRepository>(UserRepository);
    wallet = module.get<WalletRepository>(WalletRepository);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('calls UserRepository.save and returns the result', async () => {
      repository.save.mockResolvedValue('UserEntity');
      const result = await service.register(registerInput);
      expect(result).toEqual('UserEntity')
    });
  });
  describe('login', () =>{
    it('calls UserRepository.findOne and returns the result', async () =>{
      repository.findOne.mockResolvedValue(userEntity);
      await jwt.sign.mockResolvedValue('token');
      const result = await service.login(loginInput);
      expect(result).toEqual({accessToken:'token'})
    });
  });
});


// console.log(init)
// expect(init).toEqual(userEntity);
