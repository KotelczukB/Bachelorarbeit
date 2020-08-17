import prePlayerEvent from "../../hooks/pre-player-event";

import postPlayerInputCreated from '../../hooks/post-player-input-created';

export default {
  before: {
    all: [],
    find: [prePlayerEvent()],
    get: [prePlayerEvent()],
    create: [],
    update: [prePlayerEvent()],
    patch: [prePlayerEvent()],
    remove: [prePlayerEvent()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postPlayerInputCreated()],
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
