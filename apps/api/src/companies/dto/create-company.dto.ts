import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsUrl()
  website!: string;

  @IsString()
  @IsNotEmpty()
  admin!: string;
}
