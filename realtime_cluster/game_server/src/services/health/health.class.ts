import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

interface Data {}

interface ServiceOptions {}

export class Health implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find (params?: Params): Promise<Data[] | Paginated<Data>> {
    throw new Error('Function not avalible')
  }

  async get (id: Id, params?: Params): Promise<Data> {
    return {
      id, text: 'Im alife'
    };
  }

  async create (data: Data, params?: Params): Promise<Data> {
    throw new Error('Function not avalible')
  }

  async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new Error('Function not avalible')
  }

  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new Error('Function not avalible')
  }

  async remove (id: NullableId, params?: Params): Promise<Data> {
    throw new Error('Function not avalible')
  }
}
