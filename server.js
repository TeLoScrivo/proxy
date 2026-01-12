const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', createProxyMiddleware({
    target: 'https://roblox.com',
    changeOrigin: true,
    router: (req) => {
        // This handles subdomains like 'users', 'economy', etc.
        const host = req.headers.host || "";
        const subdomain = host.split('.')[0];
        return `https://${subdomain}.roblox.com`;
    },
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy active on port ${PORT}`);
});
