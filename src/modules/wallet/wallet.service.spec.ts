import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletEntity } from './entity/wallet.entity';
import { UserEntity } from '../user/entity/user.entity';

const wallet:WalletEntity = {
  balance: 1000,
  user: new UserEntity,
  id: '71636d6a-5139-4a5e-b764-b775523751e8'
}

const mockWalletRepository = () => ({
  findByUserId:jest.fn(),
  save:jest.fn()
})

describe('WalletService', () => {
  let service: WalletService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService,
        {provide:WalletRepository,useFactory:mockWalletRepository}],
      
    }).compile();

    service = module.get<WalletService>(WalletService);
    repository = module.get<WalletRepository>(WalletRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('checkBalance', () => {
    it('calls WalletRepository.findUserById and returns the result', async () => {
      await repository.findByUserId.mockResolvedValue('wallet');
      const result = await service.checkBalance('71636d6a-5139-4a5e-b764-b775523751e8');
      expect(result).toEqual('wallet')
    });
  });
  describe('depositBalance', () => {
    it('calls WalletRepository.findByUserId and WalletRepository.save and returns the result', async () => {
      await repository.findByUserId.mockResolvedValue(wallet);
      await repository.save.mockResolvedValue(1000);
      const result = await service.depositBalance('71636d6a-5139-4a5e-b764-b775523751e8',1000);
      expect(result).toEqual(1000)
    });
  });
  describe('withdrawBalance', () => {
    it('calls WalletRepository.findByUserId and WalletRepository.save and returns the result', async () => {
      await repository.findByUserId.mockResolvedValue(wallet);
      await repository.save.mockResolvedValue(1000);
      const result = await service.withdrawBalance('71636d6a-5139-4a5e-b764-b775523751e8',1000);
      expect(result).toEqual(1000)
    })
  })
});
