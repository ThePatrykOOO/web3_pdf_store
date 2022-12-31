import {Injectable} from '@nestjs/common';

@Injectable()
export class PanelAdminService {
  getHello(): string {
    return 'Hello World!';
  }
}
