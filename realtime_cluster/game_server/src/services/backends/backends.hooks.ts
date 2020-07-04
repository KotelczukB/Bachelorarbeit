import preBackendAuth from "../../hooks/pre-backend-all-auth"

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      preBackendAuth()
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
