import app from '../../src/app';

describe('\'gameApps\' service', () => {
  it('registered the service', () => {
    const service = app.service('game-apps');
    expect(service).toBeTruthy();
  });
});
