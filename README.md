HE | EN

# EN

## Ministry of Defencace home assigment 

as required this project is splint into 3 parts:
1. client - src/client
2. .net-server + sql + ef  -  src/grocerices-api
3. node(nestjs) + elasticecsearch - src/check-out-api

to run this project simaply do:

docker compose up --build -d

Then open http://localhost. Copy `.env.example` to `.env` and set `SA_PASSWORD` before starting. Set `HTTP_PORT` in `.env` if port 80 is already in use (for example, `HTTP_PORT=8080`). Caddy routes API requests to the catalog service and all other requests to the frontend, which supports client-side routing. Run `docker compose down` to stop the stack.

in adation this project is temporeail hosted: mod-<random>.aram-ski.com;



# HE
