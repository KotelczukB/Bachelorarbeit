
import preSessionCreate from '../../hooks/pre-session-create';
import preRestrictExternCall from '../../hooks/pre-session-restrict-extern-call';
export default {
  before: {
    all: [preRestrictExternCall()],
    find: [],
    get: [],
    create: [preSessionCreate()],
    update: [],
    patch: [],
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
