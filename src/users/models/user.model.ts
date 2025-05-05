import { Column, DataType, Model, Table, Validate } from 'sequelize-typescript';
import { CreateUserDto } from '../dto/create-user.dto';

@Table({
  tableName: 'users',
})
export class UserModel extends Model<UserModel, CreateUserDto> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Validate({
    length: DataType.INTEGER,
    len: {
      args: [2, 100],
      msg: 'Full name must be between 2 and 100 characters',
    },
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Validate({
    min: {
      args: [0],
      msg: 'Эффективность не может быть меньше 0',
    },
    max: {
      args: [100],
      msg: 'Эффективность не может быть больше 100',
    },
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  efficiency: number;
}
