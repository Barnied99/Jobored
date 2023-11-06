import cors from 'cors';
import proxy from 'express-http-proxy';
import requestIp from 'request-ip';
import { LRUCache } from 'lru-cache';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer'

dotenv.config();
export const NEXT_JOBS_API_URL = 'https://api.superjob.ru/';
const app = express();
const port = 5232;
const cookiePerIP = new LRUCache({
    max: 1000,
    ttl: 1000 * 60 * 3,
    updateAgeOnGet: false,
    updateAgeOnHas: false,
});

app.use(
    cors({
        origin: true,
    }),
);

app.use(requestIp.mw());

app.use(
    '/api',
    proxy(NEXT_JOBS_API_URL, {
        https: true,
        userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
            const key = userReq.clientIp;
            if (headers['set-cookie']) {
                const newCookies = headers['set-cookie'].map((c) => {
                    const [key, value] = c.split(';')[0].split('=');
                    return { key, value };
                });

                const previousCookies = cookiePerIP.get(key) || [];
                const currentCookies = previousCookies.concat(newCookies);

                cookiePerIP.set(key, currentCookies);
            }

            return headers;
        },
        proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
            const key = srcReq.clientIp;

            if (cookiePerIP.has(key)) {
                const cookies = cookiePerIP
                    .get(key)
                    .map((c) => `${c.key}=${c.value}`)
                    .join(';');

                proxyReqOpts.headers['cookie'] = cookies;
            }

            return proxyReqOpts;
        },
    }),
);



app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

app.use((req, res, next) => {
    console.log('Proxy request:', req.url);
    console.log('Proxy request:', req.body);
    next();
})


