
import preSessionCreate from '../../hooks/pre-session-create';
import postChangeVerifySessionProgress from '../../hooks/post-change-verify-session-progress';
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
    create: [postChangeVerifySessionProgress()],
    update: [],
    patch: [postChangeVerifySessionProgress()],
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
