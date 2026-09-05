HE | EN

# EN

## Ministry of Defencace home assigment 

as required this project is splint into 3 parts:
1. client - src/client
2. .net-server + sql + ef  -  src/grocerices-api
3. node(nestjs) + elasticecsearch - src/check-out-api

to run this project simaply do:

docker compose up --build -d

Then open http://localhost:8012 (or your configured `HTTP_PORT`). Copy `.env.example` to `.env` and set `SA_PASSWORD` and `ELASTIC_PASSWORD` before starting. Caddy routes `/api/orders` requests to the separate NestJS ordering service, catalog requests to the catalog service, and other requests to the frontend. Run `docker compose down` to stop the stack. See [ordering API setup and endpoints](src/check-out-api/README.md).

in adation this project is temporeail hosted: mod-<random>.aram-ski.com;



# HE
