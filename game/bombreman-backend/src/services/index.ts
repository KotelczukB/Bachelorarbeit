import { Application } from '../declarations';
import players from './players/players.service';
import gameSession from './game-session/game-session.service';
import playerInputs from './player-inputs/player-inputs.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(players);
  app.configure(gameSession);
  app.configure(playerInputs);
}
