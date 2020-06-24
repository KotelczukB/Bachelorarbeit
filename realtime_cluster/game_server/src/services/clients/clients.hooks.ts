
import postOuterAppCreate from '../../hooks/post-outer-app-create';
import preOuterClientCreate from '../../hooks/pre-outer-client-create';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preOuterClientCreate()],
    update: [preOuterClientCreate()],
    patch: [preOuterClientCreate()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postOuterAppCreate()],
    update: [postOuterAppCreate()],
    patch: [postOuterAppCreate()],
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
