export class CreateOrderResponseDto {
    order!: {
        id: string;
        internalOrderId: string;
        status: string;
    };

    message!: string;
}