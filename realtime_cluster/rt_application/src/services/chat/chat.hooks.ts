
import preChatCreateGetChannel from '../../hooks/pre-chat-create-get-channel';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [preChatCreateGetChannel()],
    update: [],
    patch: [],
    remove: []
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
