
import prePlayerEvent from '../../hooks/pre-player-event';
import prePlayerCreateGeneratetoken from '../../hooks/pre-player-create-generatetoken';
import postPlayerResponse from '../../hooks/post-players-response';
export default {
  before: {
    all: [],
    find: [],
    get: [prePlayerEvent()],
    create: [prePlayerCreateGeneratetoken()],
    update: [prePlayerEvent()],
    patch: [prePlayerEvent()],
    remove: [prePlayerEvent()]
  },

  after: {
    all: [],
    find: [postPlayerResponse()],
    get: [],
    create: [postPlayerResponse()],
    update: [],
    patch: [],
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
