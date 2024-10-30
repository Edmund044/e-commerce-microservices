import { Test, TestingModule } from '@nestjs/testing';
import { ECommerceApiGatewayController } from './e-commerce-api-gateway.controller';
import { ECommerceApiGatewayService } from './e-commerce-api-gateway.service';

describe('ECommerceApiGatewayController', () => {
  let eCommerceApiGatewayController: ECommerceApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ECommerceApiGatewayController],
      providers: [ECommerceApiGatewayService],
    }).compile();

    eCommerceApiGatewayController = app.get<ECommerceApiGatewayController>(ECommerceApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eCommerceApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
