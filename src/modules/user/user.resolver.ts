import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/common/get-user.decorator';
import { OrderEnum } from 'src/common/order.enum';
import { GqlAuth } from '../auth/guards/auth.guard';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UserDetailsOutput } from './dto/user-details.output';
import { UserService } from './user.service';

@Resolver(()=>UserDetailsOutput)
export class UserResolver {
    constructor(private readonly userService:UserService){}

    @UseGuards(GqlAuth)
    @Query(()=>UserDetailsOutput)
    viewProfile(@GetUser() user: UserDetailsOutput){
        return this.userService.viewProfile(user.id);
    }

    @UseGuards(GqlAuth)
    @Query(()=>UserDetailsOutput)
    viewOtherProfile(@Args('id') id:string){
        return this.userService.viewProfile(id);
    }

    @UseGuards(GqlAuth)
    @Mutation(()=>UserDetailsOutput)
    updateProfile(@GetUser() user: UserDetailsOutput,@Args('update')update:UpdateProfileInput){
        return this.userService.updateProfile(user.id,update);
    }

    @UseGuards(GqlAuth)
    @Query(()=>[UserDetailsOutput])
    searchProfile(
        @Args('keyword',{defaultValue:""})keyword:string,
        @Args('order',{defaultValue:OrderEnum.ASC})order:OrderEnum,
        @Args('take',{defaultValue:10})take:number,
        @Args('skip',{defaultValue:0})skip:number){
        return this.userService.searchProfile(keyword,order,take,skip);
    }

}
