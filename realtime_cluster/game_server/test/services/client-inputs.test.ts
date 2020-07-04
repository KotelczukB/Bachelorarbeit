import app from '../../src/app';

describe('\'clientInputs\' service', () => {
  it('registered the service', () => {
    const service = app.service('client-inputs');
    expect(service).toBeTruthy();
  });
});
