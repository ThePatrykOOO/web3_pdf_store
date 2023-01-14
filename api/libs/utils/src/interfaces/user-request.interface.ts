import { Request } from 'express';

export interface UserRequest extends Request {
  user: any; // or any other type
}
