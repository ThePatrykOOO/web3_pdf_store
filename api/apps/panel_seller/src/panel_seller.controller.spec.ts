import {Test, TestingModule} from '@nestjs/testing';
import {PanelSellerController} from './panel_seller.controller';
import {PanelSellerService} from './panel_seller.service';

describe('PanelSellerController', () => {
  let panelSellerController: PanelSellerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PanelSellerController],
      providers: [PanelSellerService],
    }).compile();

    panelSellerController = app.get<PanelSellerController>(PanelSellerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(panelSellerController.getHello()).toBe('Hello World!');
    });
  });
});
