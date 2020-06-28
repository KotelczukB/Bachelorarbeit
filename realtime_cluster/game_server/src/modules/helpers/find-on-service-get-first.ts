import { addToDefaultParams } from "./basic-default-service-params";

export default async (service: any, query: {query: {[idx: string]: any}}): Promise<any> => service.find(addToDefaultParams(query)).then((elem:any ) => elem.data[0])