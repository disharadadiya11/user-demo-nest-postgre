import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/common.utils';
import { CONSTANT } from '../helper/constant';
import { JwtService } from '../service/jwt.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.send(
          errorResponse(HttpStatus.BAD_REQUEST, true, CONSTANT.TOKEN_EMPTY),
        );
      }
      let { id }: any = await this.jwtService.verifyToken(token);
      req.user = await this.userService.getById(id);
      if (!req.user) {
        return res.send(
          errorResponse(HttpStatus.BAD_REQUEST, true, CONSTANT.PLEASE_REGISTER),
        );
      }
      next();
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }
}
