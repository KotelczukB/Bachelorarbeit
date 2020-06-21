import { Application } from "@feathersjs/feathers";

export const getFreeChannel = (app: Application, type: string, maxCount: number): string | null => 
  filterChannelsOnType(app.channels, type)
    .map(elem => hasMaxConnections(app, maxCount, elem))
    .sort(compareChannels)[0] ?? createChannelOnDemand(app, type)
  
export const compareChannels = (channel_1: string | null, channel_2: string | null): number =>  
  channel_1 === channel_2 ? 1 : -1

export const filterChannelsOnType = (channels: string[], type: string) => channels.filter(channel => channel.includes(type))

export const hasMaxConnections = (app: Application, maxCount: number, channelName: string): string | null  => 
  app.channel(channelName).connections.length >= maxCount ? null : channelName;

export const createChannelOnDemand = (app: Application, type: string) : string => 
  createNewChannel(app, `${type}-Session-${app.channels.length + 1}`) 

export const createNewChannel = (app: Application, name: string): string => {
  app.channel(name);
  return name;
}