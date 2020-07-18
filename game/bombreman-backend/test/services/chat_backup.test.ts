import app from '../../src/app';

describe('\'chat_backup\' service', () => {
  it('registered the service', () => {
    const service = app.service('chat-backup');
    expect(service).toBeTruthy();
  });
});
