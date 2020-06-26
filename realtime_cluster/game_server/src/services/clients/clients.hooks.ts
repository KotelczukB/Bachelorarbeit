import preOuterAppAssignSession from "../../hooks/pre-outerapp-assign-session";
import preOuterClientAuth from "../../hooks/pre-client-auth";
import preOuterappHandleExisting from "../../hooks/pre-outerapp-handle-existing";
import preOuterClientAssignChannel from "../../hooks/pre-client-reconnect-session";
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preOuterClientAuth(),
      preOuterappHandleExisting(),
      preOuterClientAssignChannel(),
      preOuterAppAssignSession(),
    ],
    update: [preOuterClientAuth(), preOuterAppAssignSession()],
    patch: [preOuterClientAuth(), preOuterAppAssignSession()],
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
