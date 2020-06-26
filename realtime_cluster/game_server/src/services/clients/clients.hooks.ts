import preOuterAppAssignChannel from "../../hooks/pre-outerapp-assign-channel";
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
      preOuterAppAssignChannel(),
    ],
    update: [preOuterClientAuth(), preOuterAppAssignChannel()],
    patch: [preOuterClientAuth(), preOuterAppAssignChannel()],
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
