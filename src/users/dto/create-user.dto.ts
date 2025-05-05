import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @Length(2, 100)
  full_name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
