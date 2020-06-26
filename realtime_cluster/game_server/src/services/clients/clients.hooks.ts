import preOuterAppAssignChannel from "../../hooks/pre-outerapp-assign-channel";
import preOuterClientAuth from "../../hooks/pre-client-auth";
import preClientHandleExisting from "../../hooks/pre-client-handle-existing";
import preOuterClientAssignChannel from "../../hooks/pre-client-assign-channel";
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preOuterClientAuth(),
      preClientHandleExisting(),
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
