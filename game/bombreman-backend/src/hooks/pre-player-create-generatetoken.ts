import { Hook, HookContext } from "@feathersjs/feathers";
import { IPlayerLogIn } from "../models/IPlayerLogIn";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data } = context as { data: IPlayerLogIn };
    data.token = `${data.user_name}-${data.user_name
      .split("")
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)}`;
    return context;
  };
};
