import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { SignInResponse } from './types/types';
@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => SignInResponse)
    async login(@Args('username') username: string, @Args('password') password: string): Promise<SignInResponse> {
        return await this.authService.login(username, password);
    }
}