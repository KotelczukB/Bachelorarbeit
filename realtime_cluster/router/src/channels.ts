import "@feathersjs/transport-commons";
import { HookContext } from "@feathersjs/feathers";
import { Application } from "./declarations";

export default function (app: Application) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  // Preventing area
  app.service("applications").publish(() => {
    null;
  });
  app.service("users").publish(() => {
    null;
  });
}
