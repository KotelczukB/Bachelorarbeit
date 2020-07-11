
import postRtServerFindGetSetup from '../../hooks/post-rt-server-find-get-setup';
import preApplicationCreateSetState from '../../hooks/pre-application-create-set-state';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preApplicationCreateSetState()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [postRtServerFindGetSetup()],
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
