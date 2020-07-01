import { Service } from "feathers-mongodb/types";
import { default_params } from "../helpers/basic-default-service-params";


export const validateUser = (service: Service, userID: string): boolean => validateToken(userID)(getUserFromDB(service, userID))

export const getUserFromDB = (service: Service, userID: string): object => service.get(userID, default_params);

export const validateToken = (userID: string) => (user: any): boolean => user.token.contains(userID);