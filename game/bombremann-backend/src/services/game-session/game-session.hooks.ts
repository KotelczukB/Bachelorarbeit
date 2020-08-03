
import preServerEvent from '../../hooks/pre-player-event';
export default {
  before: {
    all: [],
    find: [preServerEvent()],
    get: [preServerEvent()],
    create: [],
    update: [preServerEvent()],
    patch: [],
    remove: [preServerEvent()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
