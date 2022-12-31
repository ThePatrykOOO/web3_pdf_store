import {Module} from '@nestjs/common';
import {PanelSellerController} from './panel_seller.controller';
import {PanelSellerService} from './panel_seller.service';

@Module({
  imports: [],
  controllers: [PanelSellerController],
  providers: [PanelSellerService],
})
export class PanelSellerModule {
}
