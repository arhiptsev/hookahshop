import { user } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { SignInResponse } from '../types/types';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async validateUser(username: string, password: string): Promise<user > {
        const res = await this.userService.findByUsername(username);
        if (!res) { return null; }
        if (!compareSync(password, res.password)) { return null; }
        return res;
    }

    public async login(username: string, password: string): Promise<SignInResponse> {
        const user = await this.validateUser(username, password)

        if (!user) {
            throw new UnauthorizedException()
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async checkUserExist(username: string): Promise<boolean> {
        const res = await this.userService.findByUsername(username);
        return Boolean(res);
    }
}
