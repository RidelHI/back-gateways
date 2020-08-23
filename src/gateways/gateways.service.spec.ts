import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysService } from './gateways.service';
import { getModelToken } from '@nestjs/mongoose';
import { Gateway } from './schemas/gateway.schema';

describe('GatewaysService', () => {
  let service: GatewaysService;
  const modelGateway = () => ({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewaysService,
        GatewaysService,
        {
          provide: getModelToken(Gateway.name),
          useValue: modelGateway,
        },
      ],
    }).compile();

    service = module.get<GatewaysService>(GatewaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
