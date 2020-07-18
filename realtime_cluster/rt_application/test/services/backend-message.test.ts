import app from '../../src/app';

describe('\'backend-message\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend-message');
    expect(service).toBeTruthy();
  });
});
