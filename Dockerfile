# FROM node:20.14.0-alpine AS builder
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY /package*.json ./
# COPY /tsconfig.json ./

# RUN yarn install --frozen-lockfile

# COPY . .
# RUN yarn build

# FROM node:20.14.0-alpine AS prod
# WORKDIR /app

# RUN addgroup -g 1002 -S frontend
# RUN adduser -S frontend -u 1002

# COPY /package*.json ./
# COPY /tsconfig.json ./

# USER frontend

# EXPOSE ${PORT}
# CMD HOSTNAME="0.0.0.0" node index.jsx
# Build stage
FROM node:20.14.0-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:20.14.0-alpine AS prod
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build"]
