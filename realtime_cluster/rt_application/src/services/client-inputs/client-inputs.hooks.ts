
import preInputCreate from '../../hooks/pre-clientinput-create';
import clientInputPingCheck from '../../hooks/pre-clientinput-ping-and-set-data';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preInputCreate(), clientInputPingCheck()],
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
