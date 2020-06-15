import app from '../../src/app';

describe('\'applications\' service', () => {
  it('registered the service', () => {
    const service = app.service('applications');
    expect(service).toBeTruthy();
  });
});
