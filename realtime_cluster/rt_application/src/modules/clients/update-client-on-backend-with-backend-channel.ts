import fetch from "node-fetch"
import { Application } from "@feathersjs/feathers"

export default async (backend_url: string, game_channel: string, client_token: string, app: Application) => {
  return await fetch(`${backend_url}/game-session`, {
    method: "POST",
    body: JSON.stringify(
      {
        game_session: game_channel,
        rt_serverURL: `http://${app.get('host')}:${app.get('port')}`,
        token: client_token,
      }
    )
  })
}