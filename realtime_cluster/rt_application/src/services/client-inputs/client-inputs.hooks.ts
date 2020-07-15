
import preInputCreate from '../../hooks/pre-clientinput-create';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
import preClientinputPingAndSetData from '../../hooks/pre-clientinput-ping-and-set-data';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preInputCreate(), 
      preClientinputPingAndSetData()],
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
