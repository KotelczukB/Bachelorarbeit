import fetch from "node-fetch"
import { Application } from "@feathersjs/feathers"

export default async (backend_url: string, session: string, client_token: string, app: Application) => {
  console.log(`${backend_url} || ${session} || ${client_token}` )
  return await fetch(`${backend_url}/game-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(
      {
        game_session: session,
        rt_serverURL: `http://${app.get('host')}:${app.get('port')}`,
        token: client_token,
      }
    )
  })
}