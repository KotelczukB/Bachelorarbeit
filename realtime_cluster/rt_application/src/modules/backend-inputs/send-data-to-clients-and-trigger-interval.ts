import { IBackendInput } from "../../models/Interfaces/backend-inputs/IBackendInput";
import { Application } from "@feathersjs/feathers";
import { _AppType } from "../../models/Interfaces/_AppType";
import { Channel } from "@feathersjs/transport-commons/lib/channels/channel/base";
import sendInputsToTargetClients from "./send-inputs-to-target-clients";
import prepareBackendMessageOnRtConstrain from "../client-input/prepare-backend-message-on-rt-constrain";

export default async (
  data: IBackendInput,
  app: Application,
  session_service: any,
  interval: number,
  appType: _AppType
): Promise<(Channel)[] | void> =>
  await sendInputsToTargetClients(
    data,
    session_service,
    app,
    appType
  ).then(async (ret: (Channel)[]) =>
    appType === _AppType.app
      ? await prepareBackendMessageOnRtConstrain(
          data,
          app,
          interval
        ).then((ret_2: Channel[]) => ret !== null ? ret.concat(ret_2) : ret_2)
      : ret
  ).catch((err: any) => { console.log(err)});
