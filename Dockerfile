FROM node:12 AS builder
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
EXPOSE 8080

FROM node:12 as test
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app . 
CMD yarn test:watch

FROM node:12 as development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app . 
CMD yarn start:dev

FROM node:12 as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app . 
CMD yarn start:prod