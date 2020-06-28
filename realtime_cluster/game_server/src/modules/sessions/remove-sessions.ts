import ISession from "../../models/Interfaces/session/ISession";

export const searchAndRemoveFromSessions = async (
  id: string,
  service: any
) =>
  service.find({query: { clients: id }})
    .then((elem: any) => (elem.data as ISession[]).map(updateSessions(service)(id)));

export const updateSessions = (service: any) => (id: string) => async (session: ISession) => {
  await service.update(session._id, { $pull: { clients: id } })
}