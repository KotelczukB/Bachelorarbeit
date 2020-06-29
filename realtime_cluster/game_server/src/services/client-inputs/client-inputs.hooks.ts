
import preInputUpdate from '../../hooks/pre-input-update';
import postInputUpdate from '../../hooks/post-clientinput-update';
import preInputCreate from '../../hooks/pre-clientinput-create';
import postInputCreate from '../../hooks/post-clientinput-create';
import clientInputPingCheck from '../../hooks/pre-clientinput-ping-check';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preInputCreate(), clientInputPingCheck()],
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
