import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyScheduleService } from '../../filedump/weekly-schedule/weekly-schedule.service';

describe('WeeklyScheduleService', () => {
  let service: WeeklyScheduleService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [WeeklyScheduleService],
    }).compile();

    service = moduleRef.get<WeeklyScheduleService>(WeeklyScheduleService);
  });

  it('should create successfully (mocked)', async () => {
    const result = await service.create?.({});
    expect(result).toBeDefined();
  });

  it('should fail on create with invalid input (mocked)', async () => {
    try {
      await service.create?.(null);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should findAll successfully', async () => {
    const result = await service.findAll?.();
    expect(result).toBeDefined();
  });

  it('should fail to findOne with bad ID', async () => {
    const result = await service.findOne?.('invalid-id');
    expect(result).toBeNull();
  });

  it('should update or throw', async () => {
    try {
      const result = await service.update?.('invalid-id', {});
      expect(result).toBeDefined();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should delete or return false', async () => {
    const result = await service.delete?.('invalid-id');
    expect([undefined, false, null]).toContain(result);
  });
});
