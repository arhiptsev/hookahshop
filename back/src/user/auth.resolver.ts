
import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { SignInResponse } from './types/types';



@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query('login')
    async getLogin(@Args('username') username: string, @Args('password') password: string): Promise<SignInResponse> {
        return await this.authService.login(username, password);
    }

}