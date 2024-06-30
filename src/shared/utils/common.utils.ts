import * as bcrypt from 'bcrypt';

// ------------------------------------------ [ password ] ------------------------------------------------------
export const encryptPassword = (password: any) => {
  return bcrypt.hash(password, 10);
};

export const decryptPassword = (password: any, hashPassword: any) => {
  return bcrypt.compare(password, hashPassword);
};

// ------------------------------------------- [ response ] -----------------------------------------------------
export const successResponse = (
  statusCode: number,
  error: boolean,
  message: any,
  result?: any,
) => {
  return {
    statusCode,
    error,
    message,
    result,
  };
};

export const errorResponse = (
  statusCode: number,
  error: boolean,
  message: any,
  result?: any,
) => {
  return {
    statusCode,
    error,
    message,
    result,
  };
};
