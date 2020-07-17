
import preChatCreateGetChannel from '../../hooks/pre-chat-create-get-channel';
import preventExternTriggerOnEvent from '../../hooks/prevent-extern-trigger-on-event';
export default {
  before: {
    all: [],
    find: [],
    get: [preventExternTriggerOnEvent()],
    create: [preChatCreateGetChannel()],
    update: [preventExternTriggerOnEvent()],
    patch: [preventExternTriggerOnEvent()],
    remove: [preventExternTriggerOnEvent()]
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
