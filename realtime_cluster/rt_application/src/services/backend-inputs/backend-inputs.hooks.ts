
import postBackendInputForceSessionStateChanger from '../../hooks/post-backend-input-force-session-state-changer';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [preventExternTriggerOnEvent()],
    patch: [preventExternTriggerOnEvent()],
    remove: [preventExternTriggerOnEvent()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postBackendInputForceSessionStateChanger()],
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
