
import preInputUpdate from '../../hooks/pre-input-update-forbidden';
import postInputUpdate from '../../hooks/post-clientinput-update';
import preInputCreate from '../../hooks/pre-clientinput-create';
import postBackendinputSetInterval from '../../hooks/post-backendinput-set-interval';
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
