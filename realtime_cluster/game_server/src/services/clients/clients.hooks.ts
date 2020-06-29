import preClientAssignSession from "../../hooks/pre-client-assign-session";
import preOuterClientAuth from "../../hooks/pre-client-auth";
import preOuterappHandleExisting from "../../hooks/pre-client-handle-existing";
import preClientReconnectSession from "../../hooks/pre-client-reconnect-session";
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preOuterClientAuth(),
      preOuterappHandleExisting(),
      preClientReconnectSession(),
      preClientAssignSession(),
    ],
    update: [preOuterClientAuth(), preClientAssignSession()],
    patch: [preOuterClientAuth(), preClientAssignSession()],
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
