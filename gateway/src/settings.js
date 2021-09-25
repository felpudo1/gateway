import dotenv from 'dotenv';

dotenv.config()

export const key = process.env.KEY;
export const cert = process.env.CERT;


export const REDIS = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
}