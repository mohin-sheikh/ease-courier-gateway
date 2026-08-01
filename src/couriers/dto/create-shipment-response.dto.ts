export class CreateShipmentResponseDto {
    courierShipmentId!: string;

    courierTrackingNumber!: string;

    status!: string;

    rawResponse!: Record<string, unknown>;
}