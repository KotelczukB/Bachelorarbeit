
import preInputUpdate from '../../hooks/pre-input-update';
import postInputUpdate from '../../hooks/post-input-update';
import preInputCreate from '../../hooks/pre-input-create';
import postInputCreate from '../../hooks/post-client-input-create';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preInputCreate()],
    update: [preInputUpdate()],
    patch: [preInputUpdate()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postInputCreate()],
    update: [postInputUpdate()],
    patch: [postInputUpdate()],
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
