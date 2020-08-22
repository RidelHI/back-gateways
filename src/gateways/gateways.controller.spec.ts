import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { Gateway } from './schemas/gateway.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('Gateways Controller', () => {
  let gatewaysService: GatewaysService;
  let gatewaysController: GatewaysController;
  let gatewayModel: Model<Gateway>;

  const modelGateway = () => ({

  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [
        GatewaysService,
        {
          provide: getModelToken(Gateway.name),
          useValue: modelGateway,
        },
      ],
    }).compile();

    gatewayModel = module.get<Model<Gateway>>(getModelToken(Gateway.name));
    gatewaysService = module.get<GatewaysService>(GatewaysService);
    gatewaysController = module.get<GatewaysController>(GatewaysController);
  });

  it('should be defined', () => {
    expect(gatewaysController).toBeDefined();
  });
});
