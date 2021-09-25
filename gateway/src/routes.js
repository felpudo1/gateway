import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import express, { json } from 'express';

import testing from './services/testing'

const app = express()
    .use(cors())
    .options('*', cors())
    .use(morgan('dev'))
    .use(json())
    .use(helmet())

var routes = [
    { url: "/", router: testing }
]

routes.map(value => app.use(value.url, value.router))

export default app