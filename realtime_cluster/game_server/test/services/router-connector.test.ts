import app from '../../src/app';

describe('\'routerConnector\' service', () => {
  it('registered the service', () => {
    const service = app.service('router-connector');
    expect(service).toBeTruthy();
  });
});
