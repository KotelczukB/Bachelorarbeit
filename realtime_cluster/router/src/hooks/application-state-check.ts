// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import  rest  from '@feathersjs/rest-client';
import { updateObjects } from '../modules/objectsPatcher';

// Check if older rtApps are reacheble

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {app} = context;
    // get old apps and check the state
    const rtApps = await app.service('applications').find({query: { lastChecked: { $lt : new Date(-1) }}})
    // iterate thru all results
    rtApps.forEach(async (element: any) => {
      // REST for Health check 
      app.configure(rest(element.rootURL).fetch(window.fetch));
      const result = await app.service('health').get();
      // set the application state to inactiv if not responding
      updateObjects(app.service('applications'), 
        [element.type], 
        {active: result.ok}, 
        {query: {
          id: element.id,
          lastChecked: new Date()
        }
      });
    });
    return context;
  };
}
