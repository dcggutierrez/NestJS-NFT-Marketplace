import { Injectable } from '@nestjs/common';
import { OrderEnum } from 'src/common/order.enum';
import { Like,} from 'typeorm';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository){}

    async viewProfile(userId:string){
        const x = await this.userRepository.viewProfile(userId);
        return await this.userRepository.viewProfile(userId);
    }

    async updateProfile(userId:string,body:UpdateProfileInput){
        await this.userRepository.save({id:userId,...body});
        return await this.userRepository.findOne(userId);
    }

    async searchProfile(keyword:string,order:OrderEnum,take:number,skip:number){
        return await this.userRepository.find({
            where: [
                {username:Like('%'+keyword+'%')},
                {firstName:Like('%'+keyword+'%')},
                {lastName:Like('%'+keyword+'%')},
                {email:Like('%'+keyword+'%')}
            ],
            order: {updatedAt:order},
            take: take,
            skip: skip*take
        });
        }
}