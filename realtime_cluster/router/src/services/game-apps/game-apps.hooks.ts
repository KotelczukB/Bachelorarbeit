
import postBackendCreation from '../../hooks/post-backend-creation';
import applicationStateCheck from '../../hooks/application-state-check';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [applicationStateCheck()],
    update: [applicationStateCheck()],
    patch: [applicationStateCheck()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postBackendCreation()],
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
