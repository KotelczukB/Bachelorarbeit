import ISession from "../../models/Interfaces/session/ISession";
import { addToDefaultParams } from "../helpers/basic-default-service-params";

export const searchAndRemoveFromSessions = async (
  id: string,
  service: any
) =>
  service.find(addToDefaultParams({query: { clients: id }}))
    .then((elem: any) => (elem.data as ISession[]).map(updateSessions(service)(id)));

export const updateSessions = (service: any) => (id: string) => async (session: ISession) => {
  await service.update(session._id, { $pull: { clients: id } })
}