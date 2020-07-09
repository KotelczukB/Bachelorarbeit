import app from '../../src/app';

describe('\'clients\' service', () => {
  it('registered the service', async () => {
    const service = app.service('clients');
    expect(service).toBeTruthy();
  });
});
