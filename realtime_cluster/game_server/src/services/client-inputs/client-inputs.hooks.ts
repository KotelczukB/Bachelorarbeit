
import preInputUpdate from '../../hooks/pre-input-update-forbidden';
import preInputCreate from '../../hooks/pre-clientinput-create';
import clientInputPingCheck from '../../hooks/pre-clientinput-ping-set';
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
