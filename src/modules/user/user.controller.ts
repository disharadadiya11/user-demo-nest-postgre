import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { errorResponse } from 'src/shared/utils/common.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationPipe } from 'src/shared/pipes/joiValidation.pipes';
import {
  createUserJoiValidation,
  loginUserJoiValidation,
  updateUserJoiValidation,
} from './validation/user.validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //----------------------------------------------------- [ register user ] ------------------------------------------------------
  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @UploadedFile() file: any,
    @Body(new JoiValidationPipe(createUserJoiValidation)) body,
    @Res() res,
  ) {
    try {
      const result = await this.userService.register(body, file);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }

  //----------------------------------------------------- [ login user ] ------------------------------------------------------
  @Post('login')
  async login(
    @Body(new JoiValidationPipe(loginUserJoiValidation)) body,
    @Res() res,
  ) {
    try {
      const result = await this.userService.login(body);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }

  //----------------------------------------------------- [ update user ] ------------------------------------------------------
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfile(
    @UploadedFile() file: any,
    @Body(new JoiValidationPipe(updateUserJoiValidation)) body,
    @Res() res,
    @Param('id') id,
  ) {
    try {
      const result = await this.userService.updateProfile(body, file, id);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }

  //----------------------------------------------------- [ delete user ] ------------------------------------------------------
  @Delete('delete/:id')
  async deleteProfile(@Res() res, @Param('id') id: any) {
    try {
      const result = await this.userService.deleteProfile(id);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }

  //----------------------------------------------------- [ get user ] ------------------------------------------------------
  @Get('get/:id')
  async getProfile(@Res() res, @Param('id') id: any) {
    try {
      const result = await this.userService.getProfile(id);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.send(
        errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, error.message),
      );
    }
  }
}
