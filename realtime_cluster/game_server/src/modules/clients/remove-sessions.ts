import ISession from "../../Models/session/ISession";

export const searchAndRemoveFromSessions = async (
  id: string,
  service: any
) =>
  service.find({ client_names: id })
    .then((elem: any) => (elem.data as ISession[]).map(removeClient(id)).map(updateSessions(service)));

export const removeClient = (id: string) => (session: ISession): ISession => {
  return {
    ...session,
    client_names: session.client_names.filter((elem) => elem !== id),
  };
};

export const updateSessions = (service: any) => async (session: ISession) => {
  await service.update(session._id, session)
}