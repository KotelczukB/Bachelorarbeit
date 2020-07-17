import { IMessageToBackend } from "../../models/Interfaces/backend-inputs/IMessageToBackend";
import { IBackendResponse } from "../../models/Interfaces/backend-inputs/IBackendResponse";
import fetch from "node-fetch";

export default async (message: IMessageToBackend): Promise<IBackendResponse> =>
  await fetch(message.backend_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(message),
  })
    .then(async (resp: any) => await resp.json())
    .then((body: IBackendResponse) => body);
