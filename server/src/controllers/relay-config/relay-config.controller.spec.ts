import { Test, TestingModule } from '@nestjs/testing';
import { RelayConfigController } from './relay-config.controller';

describe('RelayConfigController', () => {
  let controller: RelayConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelayConfigController],
    }).compile();

    controller = module.get<RelayConfigController>(RelayConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
