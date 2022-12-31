import {Controller, Get} from '@nestjs/common';
import {PanelSellerService} from './panel_seller.service';

@Controller()
export class PanelSellerController {
  constructor(private readonly panelSellerService: PanelSellerService) {
  }

  @Get()
  getHello(): string {
    return this.panelSellerService.getHello();
  }
}
