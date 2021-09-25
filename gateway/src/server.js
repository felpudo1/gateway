import fs from 'fs';
import https from 'https';
import redisAdapter from '@socket.io/redis-adapter';
import socket from 'socket.io';

import { createClient } from 'redis';

import { cert, key, REDIS } from './settings';

import app from './routes';

const pubClient = createClient({
    host: REDIS.host,
    port: REDIS.port
});

const subClient = pubClient.duplicate();

export const server = https.createServer({
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
}, app);

export const io = socket(server).adapter(redisAdapter(pubClient, subClient));