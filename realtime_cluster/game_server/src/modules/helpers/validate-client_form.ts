import { Application } from "@feathersjs/feathers";
import validateMessage from "../clients/validate-message";
import IClientInput from "../../models/Interfaces/clients-inputs/IClientInput";

export default (input: IClientInput, app: Application): boolean =>
  validateMessage(input, app.get("client_required"), {
    game: app.get("game_required"),
  });
