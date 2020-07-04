import app from '../../src/app';

describe('\'DBContext\' service', () => {
  it('registered the service', () => {
    const service = app.service('db-context');
    expect(service).toBeTruthy();
  });
});
