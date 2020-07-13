import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio'

import fetch from 'node-fetch'
import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import mongodb from './mongodb';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(mongodb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

// dirty middleware da feathers hier die types nicht hat. 
app.configure(socketio(function(io) {
  io.use(function (socket: any, next) {
    socket.feathers.target_channel = socket.handshake.query.target_channel;
    socket.feathers.user_name = socket.handshake.query.user_name;
    socket.feathers.own_url = socket.handshake.query.own_url;
    socket.feathers.backend_url = socket.handshake.query.backend_url;
    socket.feathers.type = socket.handshake.query.type;
    socket.feathers.min_players = socket.handshake.query.min_players;
    socket.feathers.max_players = socket.handshake.query.max_players;
    socket.feathers.interval = socket.handshake.query.interval;
    socket.feathers.session_name = socket.handshake.query.session_name;
    next();
  });
}));
// router default REST Client
fetch(`${app.get("routerURL")}`, {
  method: "POST",
  body: JSON.stringify({
    type: app.get("self_type"),
    connection_string: `http://${app.get("host")}:${app.get("port")}`,
    state: null
  }),
  headers: { "Content-Type": "application/json" },
}).then(resp => resp.json()).then(console.log)

app.hooks(appHooks);

export default app;
