import app from '../../src/app';

describe('\'Communikator\' service', () => {
  it('registered the service', () => {
    const service = app.service('communikator');
    expect(service).toBeTruthy();
  });
});
