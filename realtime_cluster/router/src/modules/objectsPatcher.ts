import { Service } from "feathers-mongodb/types";

export const updateObjects = async (service: Service, types: string[], changeingParam: Object, query: object): Promise<any[]> => {
  return patchObject(service, await getObjects(service, types, query), changeingParam);
}
  
export const getObjects = async (service: Service, types: string[], query: object): Promise<any[]> => {
  return await Promise.all(types.map(type => service.find(changeQuery(type, query))));
}

export const changeQuery = (type: string | undefined, query: object): object => {
  return type !== undefined ? query = {
    ...query,
    type: type
  } : query;
}

export const patchObject = async (service: Service, objects: any[], changeingParam: Object): Promise<any[]> => {
  return await Promise.all(objects.map(object => service.patch(object.id, changeingParam)))
}

export const validateObjects = (object: Object[]): void => {
  object.forEach(elem => { if(!elem) throw new Error('desired Application could not be found!')} );
}