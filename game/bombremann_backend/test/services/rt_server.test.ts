import app from '../../src/app';

describe('\'rt_server\' service', () => {
  it('registered the service', () => {
    const service = app.service('rt-server');
    expect(service).toBeTruthy();
  });
});
