import ISession from "../../models/Interfaces/session/ISession";

export const minClientsRequirement = (session: ISession) =>
  session.clientsToStart >= session.clients.length;

export const validateSessionRequierdProps = (session: ISession) =>
  session.backend &&
  session.clients_channel &&
  session.clients_channel &&
  session.clients &&
  session.activ;