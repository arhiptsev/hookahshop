
import { Injectable } from '@nestjs/common';
import { compare, hash, hashSync } from 'bcrypt';

@Injectable()
export class PasswordService {

  private saltRounds = 10;


  getHash(password: string): string {
    return hashSync(password, this.saltRounds);
  }

  compareHash(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }

}
