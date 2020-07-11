import ISession from "../../models/Interfaces/session/ISession";

export const validateSessionRequierdProps = (session: ISession) =>
  session.backend &&
  session.clients_channel &&
  session.clients_channel &&
  session.clients;