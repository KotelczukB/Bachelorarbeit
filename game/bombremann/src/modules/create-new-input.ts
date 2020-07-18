import { CharacterSprite } from "../models/CharacterSprite";
import { BulletSprite } from "../models/BulletSprite";
import IClientMessage from "../models/transfer/IClientMessage";
import { IPlayerObject } from "../models/transfer/IPlayerObject";
import { IBulletObject } from "../models/transfer/IBulletObject";

export const createNewGameInput = (char_id: number, player: CharacterSprite, player_bullets: BulletSprite[], game_data: any, token: string): IClientMessage => {
  const player_object: IPlayerObject = {
    pos_x: player.body.x,
    pos_y: player.body.y,
    vel_x: player.body.velocity.x,
    vel_y: player.body.velocity.y,
    hp: player.hp,
    name: player.name
  }

  const bullets_objects: (IBulletObject | null)[] = player_bullets.map(bullet => {if(bullet) return {
    pos_x: bullet.body.x,
    pos_y: bullet.body.y,
    vel_x: bullet.body.velocity.x,
    vel_y: bullet.body.velocity.y,
    owner_id: bullet.owner_id,
    created_at: bullet.created_at,
    id: bullet.id
  };
   return null})
  return {
    ...setDefault(token),
    app: {
      player_data: player_object,
      bullets_data: bullets_objects.filter(elem => elem !== null),
      client_selected: `player_${char_id}`
    }
  }
}

export const createInitInput = (token: string | null): IClientMessage => {
  return {
    ...setDefault(token),
    app: {}
  }
}

export const createNewInput = (client_id: number, token: string, game_data: any): IClientMessage => {
  return {
    ...setDefault(token),
    app: {
      client_selected: `player_${client_id}`
    }
  }
}

export const  setDefault = (token: string | null): IClientMessage => {
  return {
    id: +new Date(),
    rang: NaN,
    type: 'client',
    created_utc_timestamp: +new Date(),
    sended_utc_timestamp:+new Date(),
    ping: NaN,
    client_id: localStorage.getItem('client_id'),
    session_name: "",
    target_channel_name: "",
    app: null,
    token: token
  }
}