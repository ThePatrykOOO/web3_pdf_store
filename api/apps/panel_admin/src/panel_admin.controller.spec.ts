import {Test, TestingModule} from '@nestjs/testing';
import {PanelAdminController} from './panel_admin.controller';
import {PanelAdminService} from './panel_admin.service';

describe('PanelAdminController', () => {
  let panelAdminController: PanelAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PanelAdminController],
      providers: [PanelAdminService],
    }).compile();

    panelAdminController = app.get<PanelAdminController>(PanelAdminController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(panelAdminController.getHello()).toBe('Hello World!');
    });
  });
});
