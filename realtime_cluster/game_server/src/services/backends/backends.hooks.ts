import preOuterAppAssignChannel from "../../hooks/pre-outerapp-assign-channel";

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
    create: [preOuterAppAssignChannel()],
    update: [preOuterAppAssignChannel()],
    patch: [preOuterAppAssignChannel()],
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
