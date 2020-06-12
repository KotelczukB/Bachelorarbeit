import app from '../../src/app';

describe('\'backendConnector\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend-connector');
    expect(service).toBeTruthy();
  });
});
