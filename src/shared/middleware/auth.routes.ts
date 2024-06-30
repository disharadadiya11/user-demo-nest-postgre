import { RequestMethod } from '@nestjs/common';

export const protectedRoutes = [
  {
    path: '/user/update/:id',
    method: RequestMethod.PUT,
  },
  {
    path: '/user/delete/:id',
    method: RequestMethod.DELETE,
  },
  {
    path: '/user/get/:id',
    method: RequestMethod.GET,
  },
];
