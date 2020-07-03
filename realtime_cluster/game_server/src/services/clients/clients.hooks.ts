import preClientAssignSession from "../../hooks/pre-client-assign-session";
import preClientClientAuth from "../../hooks/pre-client-all-auth";
import preClientHandleExisting from "../../hooks/pre-client-handle-existing";
import preClientReconnectSession from "../../hooks/pre-client-reconnect-session";
import postClientVerifySessionChanges from '../../hooks/post-client-verify-session-changes';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preClientClientAuth(),
      preClientHandleExisting(),
      preClientReconnectSession(),
      preClientAssignSession(),
    ],
    update: [preClientClientAuth(), preClientAssignSession()],
    patch: [preClientClientAuth(), preClientAssignSession()],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postClientVerifySessionChanges()],
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
