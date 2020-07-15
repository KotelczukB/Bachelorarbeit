import { CharacterSprite } from "../models/CharacterSprite";
import { BulletSprite } from "../models/BulletSprite";
import IClientMessage from "../models/transfer/IClientMessage";

export const createNewGameInput = (player: CharacterSprite, player_bullets: BulletSprite[], game_data: any, token: string): IClientMessage => {
  return {
    ...setDefault(token),
    app: {
      player_data: player,
      bullets_data: player_bullets
    }
  }
}


export const createNewInput = (client_id: number, token: string, game_data: any): IClientMessage => {
  return {
    ...setDefault(token),
    app: {
      client_selected: client_id
    }
  }
}

export const  setDefault = (token: string): IClientMessage => {
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