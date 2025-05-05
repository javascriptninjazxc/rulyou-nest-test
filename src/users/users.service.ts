import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomErrorException } from '../exceptions/custom-error.exception';
import { GetUserQueryDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);

    return {
      success: true,
      result: {
        id: user.id,
      },
    };
  }

  async getAll(query: GetUserQueryDto) {
    const where = Object.fromEntries(
      Object.entries({
        full_name: query.full_name
          ? { [Op.like]: `%${query.full_name}%` }
          : undefined,
        role: query.role,
        efficiency: query.efficiency,
      }).filter(([_, value]) => value !== undefined && value !== null),
    );

    const users = await this.userModel.findAll({
      where,
    });

    if (users.length === 0) {
      throw new CustomErrorException(
        `A user with this data was not found!`,
        404,
      );
    }

    return {
      success: true,
      result: { users },
    };
  }

  async get(userId: number) {
    const user = await this.userModel.findByPk(userId);

    console.log(user);

    if (!user)
      throw new CustomErrorException(`User with id ${userId} not found`, 404);

    return {
      success: true,
      result: user,
    };
  }

  async deleteAll() {
    await this.userModel.destroy({
      truncate: true,
    });

    return { success: true };
  }

  async delete(userId: number) {
    const transaction = await this.userModel.sequelize.transaction();

    try {
      const user = await this.userModel.findOne({
        where: { id: userId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!user) {
        await transaction.rollback();
        throw new CustomErrorException(`User with id ${userId} not found`, 404);
      }

      await user.destroy({ transaction });
      await transaction.commit();

      return {
        success: true,
        result: user,
      };
    } catch (err) {
      await transaction.rollback();
      throw new CustomErrorException('Failed to delete user', 500);
    }
  }

  async update(userId: number, dto: UpdateUserDto) {
    const transaction = await this.userModel.sequelize.transaction();

    try {
      const user = await this.userModel.findOne({
        where: { id: userId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!user) {
        await transaction.rollback();
        throw new CustomErrorException(`User with id ${userId} not found`, 404);
      }

      await user.update(dto, { transaction });

      await transaction.commit();

      return {
        success: true,
        result: user,
      };
    } catch (err) {
      await transaction.rollback();

      if (err instanceof CustomErrorException) {
        throw err;
      }

      throw new CustomErrorException('Failed to update user record!', 500);
    }
  }
}
