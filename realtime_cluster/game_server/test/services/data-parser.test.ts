import app from '../../src/app';

describe('\'DataParser\' service', () => {
  it('registered the service', () => {
    const service = app.service('data-parser');
    expect(service).toBeTruthy();
  });
});
