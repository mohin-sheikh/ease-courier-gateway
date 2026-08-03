import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty({
    example: 'INV-1001',
  })
  invoiceNumber!: string;

  @ApiProperty({
    example: '2026-08-03',
  })
  invoiceDate!: string;

  @ApiProperty({
    example: 2500,
  })
  invoiceValue!: number;
}
