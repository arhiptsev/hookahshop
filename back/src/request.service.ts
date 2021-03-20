import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CONTEXT } from '@nestjs/graphql';
import { Request } from 'apollo-server-express';


@Injectable({scope: Scope.REQUEST})
export class RequestService  {
  constructor(
   @Inject(REQUEST) public context: Request
  ) {
  }

}
