import prePlayerEvent from "../../hooks/pre-player-event";

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
