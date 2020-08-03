import app from '../../src/app';

describe('\'player-inputs\' service', () => {
  it('registered the service', () => {
    const service = app.service('player-inputs');
    expect(service).toBeTruthy();
  });
});
