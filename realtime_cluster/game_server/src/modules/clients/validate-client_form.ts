import { Application } from "@feathersjs/feathers";
import validateMessage from "./validate-message";
import IClientMessage from "../../models/Interfaces/clients-inputs/IClientMessage";

export default (input: IClientMessage, app: Application): boolean =>
  validateMessage(input, app.get("client_required"), {
    game: app.get("game_required"),
  });
