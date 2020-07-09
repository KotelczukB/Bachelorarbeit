import { IGameSnapShot } from "../models/IGameSnapShot";

export default (): IGameSnapShot => {
  return {
    serverURL: "",
    game_session_name: "string",
    max_session_members: 4,
    rt_session: "string",
    chars_in_use: [],
    players: [],
    all_bullets: [],
  };
};
