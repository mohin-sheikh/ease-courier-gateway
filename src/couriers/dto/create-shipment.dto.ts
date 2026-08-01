export class CreateShipmentDto {
    internalOrderId!: string;

    customerName!: string;

    customerPhone!: string;

    customerEmail?: string;

    addressLine1!: string;

    addressLine2?: string;

    city!: string;

    state!: string;

    postalCode!: string;

    country!: string;

    weight!: number;

    paymentMode!: string;

    amount!: number;
}