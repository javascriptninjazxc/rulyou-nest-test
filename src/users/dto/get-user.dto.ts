import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetUserQueryDto {
  @IsOptional()
  full_name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency?: number;
}
