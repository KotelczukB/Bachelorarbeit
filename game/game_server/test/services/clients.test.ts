import app from '../../src/app';

describe('\'Clients\' service', () => {
  it('registered the service', () => {
    const service = app.service('clients');
    expect(service).toBeTruthy();
  });
});
