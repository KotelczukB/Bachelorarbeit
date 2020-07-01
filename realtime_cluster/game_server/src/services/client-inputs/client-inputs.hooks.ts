
import preInputUpdate from '../../hooks/pre-input-update-forbidden';
import postInputUpdate from '../../hooks/post-clientinput-update';
import preInputCreate from '../../hooks/pre-clientinput-create';
import postInputCreate from '../../hooks/post-clientinput-create';
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
    create: [postInputCreate(), postClientinputValidateInterval()],
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
