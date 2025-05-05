import { IsOptional, Length, Min, Max, IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(2, 100)
  full_name: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
