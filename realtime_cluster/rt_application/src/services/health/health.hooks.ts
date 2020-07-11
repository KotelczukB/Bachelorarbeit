import preventExternTriggerOnEvent from "../../hooks/prevent-extern-trigger-on-event";

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [preventExternTriggerOnEvent()],
    patch: [preventExternTriggerOnEvent()],
    remove: []
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
