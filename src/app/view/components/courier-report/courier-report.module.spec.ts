import { CourierReportModule } from './courier-report.module';

describe('CourierReportModule', () => {
  let courierReportModule: CourierReportModule;

  beforeEach(() => {
    courierReportModule = new CourierReportModule();
  });

  it('should create an instance', () => {
    expect(courierReportModule).toBeTruthy();
  });
});
