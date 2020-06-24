import app from '../../src/app';

describe('\'backends\' service', () => {
  it('registered the service', () => {
    const service = app.service('backends');
    expect(service).toBeTruthy();
  });
});
