
import preRegisterUser from '../../hooks/pre-register-user';
import postResponseUser from '../../hooks/post-response-user';
import preRegisterUserBackend from '../../hooks/pre-register-user-backend';
import applicationStateCheck from '../../hooks/application-state-check';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preRegisterUserBackend(), preRegisterUser(), applicationStateCheck()],
    update: [preRegisterUserBackend(), preRegisterUser(), applicationStateCheck()],
    patch: [preRegisterUserBackend(), preRegisterUser(), applicationStateCheck()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postResponseUser()],
    update: [postResponseUser()],
    patch: [postResponseUser()],
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
