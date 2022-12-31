import {Test, TestingModule} from '@nestjs/testing';
import {StoreController} from './store.controller';
import {StoreService} from './store.service';

describe('StoreController', () => {
  let storeController: StoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService],
    }).compile();

    storeController = app.get<StoreController>(StoreController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(storeController.getHello()).toBe('Hello World!');
    });
  });
});
