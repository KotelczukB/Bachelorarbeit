import { default_params } from "../helpers/basic-default-service-params";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IClientConnection } from "../../models/Interfaces/clients/IClientConnection";
import { Paginated } from "@feathersjs/feathers";


export const validateUser = (client_service: any, user: IClientMessage):Promise <boolean> => getUserFromDB(client_service, user).then(validateToken(user))

export const getUserFromDB = async (client_service: any, user: IClientMessage): Promise<Paginated<IClientConnection>> => await client_service.get(user, default_params);

export const validateToken = (client_input: IClientMessage) => (user: Paginated<IClientConnection>): boolean => user.data[0].token === client_input.token;