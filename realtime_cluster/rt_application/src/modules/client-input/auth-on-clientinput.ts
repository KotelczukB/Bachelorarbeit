import { default_params } from "../helpers/basic-default-service-params";


export const validateUser = (client_service: any, userID: string):Promise <boolean> => getUserFromDB(client_service, userID).then(validateToken(userID))

export const getUserFromDB = async (client_service: any, userID: string): Promise<object> => await client_service.get(userID, default_params);

export const validateToken = (userID: string) => (user: any): boolean => user.token.contains(userID);