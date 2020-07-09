
import preGameSessionValidatePlayerInput from '../../hooks/pre-game-session-validate-player-input';
import postGameSessionPatch from '../../hooks/post-game-session-patch';
import preServerEvent from '../../hooks/pre-player-event';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preServerEvent()],
    update: [],
    patch: [preGameSessionValidatePlayerInput()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [postGameSessionPatch()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
