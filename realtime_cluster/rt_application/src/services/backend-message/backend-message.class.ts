import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";
import getNewestInputsOnSession from "../../modules/client-input/get-newest-inputs-on-session";
import { addToDefaultParams } from "../../modules/helpers/basic-default-service-params";
import ISession from "../../models/Interfaces/session/ISession";
import clientInputsAppRtModifications from "../../modules/rtFunctions/client-inputs-app-rt-modifications";
import { getHOST, getPort } from "../../modules/helpers/get-envs";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";
import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";

interface Data {}

interface ServiceOptions {}

export class BackendMessage implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    throw new Error("Method not implemented");
  }

  async get(id: Id, params?: Params): Promise<Data> {
    throw new Error("Method not implemented");
  }

  async create(
    data: IClientMessage,
    params?: Params
  ): Promise<IMessageToBackend> {
    const message = await this.app
      .service("sessions")
      .find(addToDefaultParams({ query: { session_name: data.session_name } }))
      .then((res: any[] | Paginated<ISession>) =>
        (res as Paginated<ISession>).data.filter(
          (elem: ISession) => +elem.interval_value <= 0
        )
      )
      .then(async (sessions: ISession[]) => {
        return await Promise.all(
          sessions.map(
            async (session: ISession) =>
              await getNewestInputsOnSession(
                this.app.service("sessions"),
                this.app.service("client-inputs"),
                session.session_name,
                -1 // sort direction
              )
                .then(
                  clientInputsAppRtModifications(
                    `https://${getHOST()}`,
                    session.backends_channel,
                    session.backend[0]
                  )
                )
          )
        );
      });
      if(message[0])
        return message[0];
      throw new Error('Failed on Backend message creation')
  }

  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new Error("Method not implemented");
  }

  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new Error("Method not implemented");
  }

  async remove(id: NullableId, params?: Params): Promise<Data> {
    throw new Error("Method not implemented");
  }
}
