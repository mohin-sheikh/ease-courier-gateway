import { Injectable } from '@nestjs/common';

import { CourierPartner } from '../../common/enums/courier-partner.enum';

import { CourierInterface } from '../interfaces/courier.interface';
import { UrbaneboltAdapter } from '../adapters/urbanebolt.adapter';

@Injectable()
export class CourierFactory {
  constructor(private readonly urbaneboltAdapter: UrbaneboltAdapter) {}

  getCourier(courier: CourierPartner): CourierInterface {
    switch (courier) {
      case CourierPartner.URBANEBOLT:
        return this.urbaneboltAdapter;

      default:
        throw new Error(`Unsupported courier ${courier}`);
    }
  }
}
