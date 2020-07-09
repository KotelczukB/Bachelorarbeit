import prePlayerEvent from "../../hooks/pre-player-event";

import prePlayerInputValidateRtServer from '../../hooks/pre-player-input-validate-rt-server';

export default {
  before: {
    all: [],
    find: [prePlayerEvent()],
    get: [prePlayerEvent()],
    create: [prePlayerInputValidateRtServer()],
    update: [prePlayerEvent()],
    patch: [prePlayerEvent()],
    remove: [prePlayerEvent()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
