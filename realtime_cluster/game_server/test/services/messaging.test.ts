import app from '../../src/app';

describe('\'messaging\' service', () => {
  it('registered the service', () => {
    const service = app.service('messaging');
    expect(service).toBeTruthy();
  });
});
