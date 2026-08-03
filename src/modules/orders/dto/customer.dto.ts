import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: '9876543210',
  })
  @IsPhoneNumber('IN')
  mobile!: string;

  @ApiProperty({
    required: false,
    example: 'john@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
