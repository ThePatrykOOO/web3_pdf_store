import {Injectable} from '@nestjs/common';

@Injectable()
export class PanelSellerService {
  getHello(): string {
    return 'Hello World!';
  }
}
