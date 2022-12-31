import {Controller, Get} from '@nestjs/common';
import {PanelAdminService} from './panel_admin.service';

@Controller()
export class PanelAdminController {
  constructor(private readonly panelAdminService: PanelAdminService) {
  }

  @Get()
  getHello(): string {
    return this.panelAdminService.getHello();
  }
}
