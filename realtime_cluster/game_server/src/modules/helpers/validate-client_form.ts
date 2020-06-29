import IClientForm from "../../Models/Interfaces/IClientForm";
import { Application } from "@feathersjs/feathers";
import validateMessage from "../clients/validate-message";

export default (input: IClientForm, app: Application): boolean =>
  validateMessage(input, app.get("client_required"), {
    client_data: app.get("client_data_required"),
    game: app.get("game_required"),
  });
