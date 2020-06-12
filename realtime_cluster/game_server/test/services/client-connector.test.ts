import app from '../../src/app';

describe('\'clientConnector\' service', () => {
  it('registered the service', () => {
    const service = app.service('client-connector');
    expect(service).toBeTruthy();
  });
});
