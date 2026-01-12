const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://roblox.com',
    changeOrigin: true,
    router: (req) => {
        // Automatically routes to the correct Roblox subdomain
        const subdomain = req.headers.host.split('.')[0];
        return `https://${subdomain}.roblox.com`;
    },
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
    }
}));

app.listen(process.env.PORT || 3000);
