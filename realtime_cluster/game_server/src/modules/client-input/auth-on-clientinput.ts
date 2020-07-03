import { Service } from "feathers-mongodb/types";
import { default_params } from "../helpers/basic-default-service-params";


export const validateUser = (service: any, userID: string):Promise <boolean> => getUserFromDB(service, userID).then(validateToken(userID))

export const getUserFromDB = async (service: any, userID: string): Promise<object> => await service.get(userID, default_params);

export const validateToken = (userID: string) => (user: any): boolean => user.token.contains(userID);