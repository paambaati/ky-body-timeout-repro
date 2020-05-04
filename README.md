# Ky `afterResponse` Bug Repro

Steps to reproduce —

1. `git clone http://github.com/paambaati/ky-body-timeout-repro`
2. `cd ky-body-timeout-repro`
3. `yarn install`
4. `node server.js` in a separate window. This will simulate a backend API in my case that returns JSON responses. It runs on port `8080`.
5. `node index.js` in a separate window. This will simulate the frontend app's Node server. It runs on port `8081`.
6. `curl http://localhost:8081/`

### The issue

When using a `afterResponse` hook for responses over ~50KB (I'm not sure what this exact number is), the `response.json()` Promise doesn't resolve.

In this repro, the API call would not return anything and eventually time out.

This can be tested out by fully removing the `hooks` section from the `ky` options object, and `curl http://localhost:8081/` will correctly return the JSON.