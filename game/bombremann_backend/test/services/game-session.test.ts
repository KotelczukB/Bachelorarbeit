import app from '../../src/app';

describe('\'game-session\' service', () => {
  it('registered the service', () => {
    const service = app.service('game-session');
    expect(service).toBeTruthy();
  });
});
