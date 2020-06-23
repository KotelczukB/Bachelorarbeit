import { Service } from "feathers-mongodb/types";


export const validateUser = (service: Service, userID: string): boolean => validateToken(userID)(getUserFromDB(service, userID))

export const getUserFromDB = (service: Service, userID: string): object => service._get(userID);

export const validateToken = (userID: string) => (user: any): boolean => user.token.contains(userID);