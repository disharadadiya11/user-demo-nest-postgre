import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: string;
  private readonly expireIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET_KEY;
    this.expireIn = process.env.JWT_EXPIRES_IN;
  }

  //-------------------------------------------------------- [ token ] -----------------------------------------------------------------
  async generateToken(payload: any) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expireIn });
  }

  async verifyToken(token: any) {
    return jwt.verify(token, this.secret);
  }
}
