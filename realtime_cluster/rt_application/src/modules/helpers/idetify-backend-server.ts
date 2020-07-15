import { IConnection } from "../../models/IConnection";
import { RealTimeConnection } from "@feathersjs/transport-commons/lib/channels/channel/base";
import { _ExternType } from "../../models/Interfaces/_ExternType";

export default (
  connection: IConnection,
  backend_connections: RealTimeConnection
): RealTimeConnection | undefined => {
  return backend_connections.find(
    (elem: any) =>
      elem.own_url === connection.backend_url
  );
}
