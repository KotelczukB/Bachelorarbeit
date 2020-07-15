
import postBackendInputForceSessionStateChanger from '../../hooks/post-backend-input-force-session-state-changer';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
import postBackendInputCreated from '../../hooks/post-backend-input-created';
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
    create: [postBackendInputForceSessionStateChanger(), postBackendInputCreated()],
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
