import { Args, Resolver,Query, Mutation } from '@nestjs/graphql';
import { UserDetailsOutput } from '../user/dto/user-details.output';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService:AuthService){}

    @Query(()=> LoginOutput)
    login(@Args('input')input:LoginInput){
        return this.authService.login(input);
    }

    @Mutation(()=>UserDetailsOutput)
    register(@Args('input')input:RegisterInput){
        return this.authService.register(input);
    }
}
