import preventExternTriggerOnEvent from "../../hooks/prevent-extern-trigger-on-event";

export default {
  before: {
    all: [],
    find: [preventExternTriggerOnEvent()],
    get: [preventExternTriggerOnEvent()],
    create: [],
    update: [preventExternTriggerOnEvent()],
    patch: [preventExternTriggerOnEvent()],
    remove: [preventExternTriggerOnEvent()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
