
import preSessionCreate from '../../hooks/pre-session-validate';
import preRestrictExternCall from '../../hooks/pre-session-restrict-extern-call';
import preSessionGetInterval from '../../hooks/pre-session-get-interval';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
export default {
  before: {
    all: [preRestrictExternCall()],
    find: [],
    get: [],
    create: [/*preSessionCreate()*/ preSessionGetInterval()],
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
