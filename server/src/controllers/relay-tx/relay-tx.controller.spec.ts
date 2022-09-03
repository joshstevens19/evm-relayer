import { Test, TestingModule } from '@nestjs/testing';
import { RelayTxController } from './relay-tx.controller';

describe('RelayTxController', () => {
  let controller: RelayTxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelayTxController],
    }).compile();

    controller = module.get<RelayTxController>(RelayTxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
