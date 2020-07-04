import app from '../../src/app';

describe('\'backendInputs\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend-inputs');
    expect(service).toBeTruthy();
  });
});
