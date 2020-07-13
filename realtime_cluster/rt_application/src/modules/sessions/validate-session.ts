import ISession from "../../models/Interfaces/session/ISession";

export const validateSessionRequierdProps = (session: ISession) =>
  session.backend !== undefined &&
  session.clients_channel !== undefined  &&
  session.clients_channel !== undefined  &&
  session.clients !== undefined ;