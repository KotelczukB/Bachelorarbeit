import { Application } from "@feathersjs/feathers";


export const findFreeChannel = (app: Application, maxCount: number): string | null => getFirstName(app.channels.map(elem => hasMaxConnections(app, maxCount, elem)));

export const hasMaxConnections = (app: Application, maxCount: number, channelName: string): string | null  => app.channel(channelName).connections.length >= maxCount ? null : channelName;

export const getFirstName = (names: (string | null)[]) : string | null => names.filter(elem => elem !== null)[0];
