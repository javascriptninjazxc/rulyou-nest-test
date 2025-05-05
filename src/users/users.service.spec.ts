import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from './models/user.model';
import { CreateUserDto } from "./dto/create-user.dto";

describe('UserService', () => {
  let service: UsersService;

  const mockUserModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(UserModel),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
