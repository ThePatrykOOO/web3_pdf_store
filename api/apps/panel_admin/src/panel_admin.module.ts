import {Module} from '@nestjs/common';
import {PanelAdminController} from './panel_admin.controller';
import {PanelAdminService} from './panel_admin.service';

@Module({
  imports: [],
  controllers: [PanelAdminController],
  providers: [PanelAdminService],
})
export class PanelAdminModule {
}
