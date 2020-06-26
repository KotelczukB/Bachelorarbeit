import preOuterAppAssignSession from "../../hooks/pre-outerapp-assign-session";
import preBackendAuth from "../../hooks/pre-backend-auth";
import preOuterappHandleExisting from "../../hooks/pre-outerapp-handle-existing";

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preBackendAuth(),
      preOuterappHandleExisting(),
      preOuterAppAssignSession(),
    ],
    update: [preBackendAuth()],
    patch: [preBackendAuth()],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
