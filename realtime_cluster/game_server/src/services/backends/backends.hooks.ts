import postOuterAppCreate from "../../hooks/post-outer-app-create";

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postOuterAppCreate()],
    update: [postOuterAppCreate()],
    patch: [postOuterAppCreate()],
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
