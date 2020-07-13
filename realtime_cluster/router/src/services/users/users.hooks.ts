
import postResponseUser from '../../hooks/post-response-user';
import applicationStateCheck from '../../hooks/application-state-check';
import preUserCreate from '../../hooks/pre-user-create';
import preUsersCreateRemoveIfExistis from '../../hooks/pre-users-create-remove-if-existis';
import preUserFind from '../../hooks/pre-user-find';
export default {
  before: {
    all: [],
    find: [applicationStateCheck(), preUserFind()],
    get: [],
    create: [applicationStateCheck(), preUsersCreateRemoveIfExistis(), preUserCreate()],
    update: [applicationStateCheck()],
    patch: [applicationStateCheck()],
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
