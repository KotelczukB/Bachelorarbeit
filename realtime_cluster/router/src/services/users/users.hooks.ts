
import preRegister from '../../hooks/pre-register';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preRegister()],
    update: [preRegister()],
    patch: [preRegister()],
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
