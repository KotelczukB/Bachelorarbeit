import { Application } from '../declarations';
import players from './players/players.service';
import gameSession from './game-session/game-session.service';
import playerInputs from './player-inputs/player-inputs.service';
import rtServer from './rt_server/rt_server.service';
import chatBackup from './chat_backup/chat_backup.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(players);
  app.configure(gameSession);
  app.configure(playerInputs);
  app.configure(rtServer);
  app.configure(chatBackup);
}
