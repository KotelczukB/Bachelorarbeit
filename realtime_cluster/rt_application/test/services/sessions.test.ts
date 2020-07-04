import app from '../../src/app';

describe('\'Sessions\' service', () => {
  it('registered the service', () => {
    const service = app.service('sessions');
    expect(service).toBeTruthy();
  });
});
