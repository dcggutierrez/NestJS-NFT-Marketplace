import { forwardRef, Module } from '@nestjs/common';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { WalletEntity } from './entity/wallet.entity';
import { UserModule } from '../user/user.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([
                              WalletRepository,
                            ]),
  ],
  providers: [
    WalletResolver, 
    WalletService
  ],
  exports: [
    WalletService,
  ]
})
export class WalletModule {}
