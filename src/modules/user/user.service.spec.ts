import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UpdateProfileInput } from './dto/update-profile.input';
import { GenderEnum } from 'src/common/gender.enum';
import { OrderEnum } from 'src/common/order.enum';

const updateProfileInput:UpdateProfileInput = {
  firstName:"Dustine",
  lastName:"Gutierrez",
  email:"dcliffggutierrez@gmail.com",
  gender:GenderEnum.Male
}

const mockUserRepository = () => ({
  viewProfile:jest.fn(),
  save:jest.fn(),
  findOne:jest.fn(),
  find:jest.fn()
})

describe('UserService', () => {
  let service: UserService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {provide:UserRepository,useFactory:mockUserRepository}],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('viewProfile', () => {
    it('calls UserRepository.viewProfile and return the result' , async () => {
      await repository.viewProfile.mockResolvedValue('UserDetailsOutput');
      const result = await service.viewProfile('71636d6a-5139-4a5e-b764-b775523751e8');
      expect(result).toEqual('UserDetailsOutput');
    });
  });
  describe('updateProfile', () => {
    it('calls UserRepository.save and UserRepository.findOne and return the result', async () => {
      await repository.save.mockResolvedValue('UserEntity');
      await repository.findOne.mockResolvedValue('UserDetailOutput');
      const result = await service.updateProfile('71636d6a-5139-4a5e-b764-b775523751e8',updateProfileInput);
      expect(result).toEqual('UserDetailOutput');
    })
  })
  describe('searchProfile', () => {
    it('calls UserRepository.find and return the result', async () => {
      await repository.find.mockResolvedValue('SearchResult');
      const result = await service.searchProfile('Dustine',OrderEnum.ASC,10,0);
      expect(result).toEqual('SearchResult');
    })
  })
});
