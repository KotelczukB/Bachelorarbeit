
import preSessionCreate from '../../hooks/pre-session-create';
export default {
  before: {
    all: [],
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
