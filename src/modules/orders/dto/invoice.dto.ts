import { IsDateString, IsNumber, IsString } from 'class-validator';

export class InvoiceDto {

    @IsString()
    invoiceNumber!: string;

    @IsDateString()
    invoiceDate!: string;

    @IsNumber()
    invoiceValue!: number;
}