export class ManifestResponseDto {
  success!: boolean;

  message!: string;

  data!: {
    shipmentId?: string;

    awbNumber?: string;

    trackingNumber?: string;
  };

  raw?: unknown;
}
