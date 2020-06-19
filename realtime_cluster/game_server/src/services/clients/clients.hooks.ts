
import postClientCreate from '../../hooks/post-client-create';
import preClientCreate from '../../hooks/pre-client-create';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preClientCreate()],
    update: [preClientCreate()],
    patch: [preClientCreate()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postClientCreate()],
    update: [postClientCreate()],
    patch: [postClientCreate()],
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
