import { CharacterSprite } from "../models/CharacterSprite";
import { BulletSprite } from "../models/BulletSprite";
import IClientMessage from "../models/transfer/IClientMessage";

export const createNewGameInput = (player: CharacterSprite, player_bullets: BulletSprite[], game_data: any): IClientMessage => {
  return {
    ...setDefault(game_data),
    app: {
      player: player,
      player_bullets
    }
  }
}


export const createNewInput = (client_id: number, game_data: any): IClientMessage => {
  return {
    ...setDefault(game_data),
    app: {
      client_selected: client_id
    }
  }
}

export const  setDefault = (game_data: any): IClientMessage => {
  return {
    rang: NaN,
    type: 'client',
    created_utc_timestamp: +new Date(),
    sended_utc_timestamp:+new Date(),
    ping: NaN,
    client_id: localStorage.getItem('client_id'),
    session_name: game_data.session_name,
    target_channel_name: game_data.target_channel_name,
    app: null,
    token: localStorage.getItem('token')
  }
}