import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Not, Repository } from 'typeorm';
import {
  decryptPassword,
  encryptPassword,
  errorResponse,
  successResponse,
} from 'src/shared/utils/common.utils';
import { CONSTANT } from 'src/shared/helper/constant';
import { JwtService } from 'src/shared/service/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //----------------------------------------------------- [ register user ] ------------------------------------------------------
  async register(body: any, file: any) {
    if (file) {
      body.image = `http://localhost:8989/${file.path.replace(/\\/g, '/')}`;
    }
    let user: any = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (user) {
      return errorResponse(HttpStatus.OK, false, CONSTANT.EMAIL_ALREADY_INUSE);
    }
    body.password = await encryptPassword(body.password);
    user = this.userRepository.create(body);
    user.created_by = user.id;
    await this.userRepository.save(user);
    user.password = undefined;
    return successResponse(
      HttpStatus.OK,
      false,
      CONSTANT.REGISTER_SUCCESS,
      user,
    );
  }

  //----------------------------------------------------- [ login user ] ------------------------------------------------------
  async login(body: any) {
    let user: any = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (!user) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        true,
        CONSTANT.PLEASE_REGISTER,
      );
    }
    if (!(await decryptPassword(body.password, user.password))) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        true,
        CONSTANT.WRONG_CREDENTIALS,
      );
    }
    let token = await this.jwtService.generateToken({ id: user.id });
    user = {
      ...user,
      token,
      password: undefined,
    };
    return successResponse(HttpStatus.OK, false, CONSTANT.LOGIN_SUCCESS, user);
  }

  //----------------------------------------------------- [ register user ] ------------------------------------------------------
  async updateProfile(body: any, file: any, id: any) {
    let user: any = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    if (!user) {
      return errorResponse(HttpStatus.OK, false, CONSTANT.NOT_FOUND);
    }
    if (file) {
      body.image = `http://localhost:8989/${file.path.replace(/\\/g, '/')}`;
    }
    user = await this.userRepository.findOne({
      where: [{ email: body.email }, { created_by: Not(Number(id)) }],
    });
    if (user) {
      return errorResponse(HttpStatus.OK, false, CONSTANT.EMAIL_ALREADY_INUSE);
    }
    user.updated_by = user.id;
    body.updated_at = new Date();
    await this.userRepository.save({ ...user, ...body });
    return successResponse(HttpStatus.OK, false, CONSTANT.UPDATE_SUCCESS, user);
  }

  //----------------------------------------------------- [ delete user ] ------------------------------------------------------
  async deleteProfile(id: any) {
    const user: any = await this.userRepository.delete(Number(id));
    if (!user) {
      return errorResponse(HttpStatus.OK, false, CONSTANT.NOT_FOUND);
    }
    return successResponse(HttpStatus.OK, false, CONSTANT.DELETE_SUCCESS);
  }

  //----------------------------------------------------- [ get user ] ------------------------------------------------------
  async getProfile(id: any) {
    const user: any = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    return successResponse(HttpStatus.OK, false, CONSTANT.FOUND_SUCCESS, user);
  }

  //----------------------------------------------------- [ get user ] ------------------------------------------------------
  async getById(id: any) {
    const user: any = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    return successResponse(HttpStatus.OK, false, CONSTANT.FOUND_SUCCESS, user);
  }
}
