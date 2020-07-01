
import preInputUpdate from '../../hooks/pre-input-update-forbidden';
import preInputCreate from '../../hooks/pre-clientinput-create';
import clientInputPingCheck from '../../hooks/pre-clientinput-ping-set';
import postClientinputValidateInterval from '../../hooks/post-clientinput-validate-interval';
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
    create: [postClientinputValidateInterval()],
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
