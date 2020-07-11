
import preSessionCreate from '../../hooks/pre-session-validate';
import preRestrictExternCall from '../../hooks/pre-session-restrict-extern-call';
import preSessionGetInterval from '../../hooks/pre-session-get-interval';
import postSessionDropConnectionsOnClosed from '../../hooks/post-session-drop-connections-on-closed';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
export default {
  before: {
    all: [preRestrictExternCall()],
    find: [],
    get: [],
    create: [preSessionCreate(), preSessionGetInterval()],
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
    patch: [postSessionDropConnectionsOnClosed()],
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
