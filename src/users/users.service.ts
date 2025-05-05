import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}
}
