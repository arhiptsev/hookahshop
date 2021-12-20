import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service ';
import { PasswordService } from './services/password.service';
import { UserService } from './services/user.service';
import { RegistrationResponse } from './types/types';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly passwordService: PasswordService,
  ) {}

  @Mutation(() => RegistrationResponse)
  async registration(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<RegistrationResponse> {
    const isExist = await this.authService.checkUserExist(username);

    if (isExist) {
      throw new GraphQLError('Username already existing');
    }

    const passwordHash = this.passwordService.getHash(password);

    await this.userService.create({
      username: username,
      password: passwordHash,
      created_at: (new Date().getTime() as unknown) as bigint,
    });

    return {
      isSuccess: true,
    };
  }

  @Query(() => Boolean)
  async isUserExisting(@Args('username') username: string): Promise<boolean> {
    return this.authService.checkUserExist(username);
  }
}
