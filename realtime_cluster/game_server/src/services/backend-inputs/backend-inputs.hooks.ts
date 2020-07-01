
import preInputUpdate from '../../hooks/pre-input-update-forbidden';
import preInputCreate from '../../hooks/pre-clientinput-create';
import postBackendinputSetInterval from '../../hooks/post-backendinput-run-interval';
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
    create: [postBackendinputSetInterval()],
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
