FROM node:20.14.0-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json yarn.lock /app/

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn build
RUN yarn build && ls -l /app/build


FROM node:20.14.0-alpine AS prod
WORKDIR /app

RUN addgroup -g 1002 -S frontend
RUN adduser -S frontend -u 1002

COPY --from=builder /app/build /app

USER frontend

EXPOSE ${PORT}

CMD ["node", "build/server.js"]
