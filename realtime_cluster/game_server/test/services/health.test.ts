import app from '../../src/app';

describe('\'health\' service', () => {
  it('registered the service', () => {
    const service = app.service('health');
    expect(service).toBeTruthy();
  });
});
