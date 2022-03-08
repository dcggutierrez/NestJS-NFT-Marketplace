import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Equal } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { WalletRepository } from '../wallet/wallet.repository';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository:UserRepository,
        private readonly walletRepository:WalletRepository,
        private readonly jwtService: JwtService){}

    async register(input:RegisterInput){
        const {username,email} = input;
        const userNameExist = await this.userRepository.findOne({
            username: Equal(username)
        });
        const emailExist = await this.userRepository.findOne({
            email: Equal(email)
        });
        if (userNameExist){
            throw new BadRequestException('Username already exist.');
        }
        if(emailExist){
            throw new BadRequestException('Email already exist.')
        }

        const {password} = input;
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password,salt);
        const user = await this.userRepository.save({...input,password: encryptedPassword});
        const wallet = await this.walletRepository.save({balance:0,user:user});
        return user
    }

    async login(input:LoginInput){
        const{username,password} = input;
        const user = await this.userRepository.findOne({
            username: Equal(username)
        });
        if(user.isTakenDown===true){
            throw new UnauthorizedException('Account taken down by Admin');
        }

        if(!user){
            throw new BadRequestException('Invalid username or password.');
        }

        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            throw new BadRequestException('Invalid username or password.');
        } 
        const {id,firstName,lastName,email,gender,role} = user;
        const payload = { id, username, firstName, lastName, email, gender, role };
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
