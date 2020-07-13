import { IBulletObject } from "../models/transfer/IBulletObject";

export default (own: IBulletObject, server_side: IBulletObject) => Math.abs(own.pos_x - server_side.pos_x) < 5 && Math.abs(own.pos_y - server_side.pos_y) < 5